const mongoose= require('mongoose');
const {Schema}= mongoose;
 
const UserSchema= new Schema({
  
  name: String,
  email: {type:String, unique:[true, "this user is already registered"]},
  password: String
});


const UserModel= mongoose.model('User', UserSchema);

module.exports= UserModel;