import PhotosUploader from "../photosUploader";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Perks from "../perksLabels";
import { useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { useEffect } from "react";



export default function PlacesFormPage(){
  const {id}= useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [redirect, setRedirect]= useState(false);
  const[price, setPrice]= useState(100);

function handlePhotosChange(newPhotos) {
  // Logic to handle the updated photos from the PhotosUploader component
  setAddedPhotos(newPhotos); // Update the state with new photos
}
useEffect(()=>{
  if (!id){
    return;
  }

  axios.get('/places/'+id).then(response =>{
    const {data}=response;
    setTitle(data.title);;
    setAddress(data.address);
    setAddedPhotos(data.photos);
    setDescription(data.description);
    setPerks(data.perks);
    setExtraInfo(data.extraInfo);
    setCheckIn(data.checkIn);
    setCheckOut(data.checkOut);
    setMaxGuests(data.maxGuests);
    setPrice(data.price);
  });
}, [id]);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  
  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
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
    };
  
    if (id) {
      await axios.put('/places/:id', {
        id,
        ...placeData
      }).then((res)=>{
        console.log(res);
      });
      setRedirect(true)//update
    } else{
      await axios.post('/places', {
        ...placeData
      });
      setRedirect(true);
    }


   
  }
  if (redirect){
    return <Navigate to ={'/account/places'}/>
  }
  
  return(
    
    <div>
      <AccountNav/>
    <form onSubmit={savePlace}>
      {preInput('Title', 'Title should be short and catchy')}
      <input type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder="my lovely apartment" />
      {preInput('Address', 'address to this place')}
      <input type="text" value={address} onChange={(ev) => setAddress(ev.target.value)} placeholder="address" />
      {preInput('Photos', 'more=better')}

      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
      {preInput('Description', 'add a description of your place')}
      <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />
      {preInput('Perks', 'Select all the perks of your place')}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-8 sm:grid-cols-1 items-center">
        <Perks selected={perks} onChange={setPerks} />
      </div>

      {preInput('extra info', 'house rules, etc...')}
      <textarea value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)} />
      {preInput('check-in and check-out', 'add check-in and check-out time, remember to add some time window for cleaning purposes')}
      <div className="mt-3 grid cols-2 md:grid-cols-4 gap-4 lg:grid-cols-8 sm:grid-cols-1">
        
          <label className="gap-2">
            <h3>check-in time</h3>
            <input type="time" className="border pl-2" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
          </label>
       
        
          <label className="gap-2">
            <h3>check-out time</h3>
            <input type="time" className="border pl-2" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
          </label>
        
          <label className="gap-2">
            <h3>max guests</h3>
            <input type="number" className="border pl-2" value={maxGuests} onChange={(ev) => setMaxGuests(ev.target.value)} />
          </label>
      
       
          <label className="gap-2">
            <h3>Price per night</h3>
            <input type="number" className="border pl-2" value={price} onChange={(ev) => setPrice(ev.target.value)} />
          </label>
       
      </div>
      <button className="bg-primary my-6 text-white py-2 px-6 rounded-full">
        Save
      </button>
    </form>
  </div>)}