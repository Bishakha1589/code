const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/user.js');
const bcryptSalt = bcrypt.genSaltSync(10);
const imageDownloader = require('image-downloader');
const fs = require('fs');
const place = require('./models/place.js');

const multer = require('multer');

const jwtSecret = 'your-secret-key'; // Replace with your secret key
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      phoneNumber,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.json('PASS NOT OK');
    }
  } else {
    res.json('User not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        res.status(401).json({ error: 'JWT Verification Failed' });
      } else {
        console.log('Decoded UserData:', userData);

        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      }
    });
  } else {
    res.json(null);
  }
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = '' + Date.now() + '.jpg';

  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

app.post('/places', async (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        res.status(401).json({ error: 'JWT Verification Failed' });
      } else {
       

        const placeDoc = await place.create({
          owner: userData.id,
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        });

        res.json(placeDoc);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
       const { id } = userData;
      res.json(await place.find({ owner: id }));
    });
  });
app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await place.findById(id));
});

app.put('/places/:id', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;
 
      

      
      jwt.verify(token, jwtSecret, {},async(err, userData)=>{
        if(err) throw err;
        const placeDoc = await place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
          placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
          });
  
          await placeDoc.save();
          res.json('ok');
        }

      })
      
    }
  );

  app.get('/places',async (req,res)=>{
    res.json( await place.find());
  })


app.listen(3000);
