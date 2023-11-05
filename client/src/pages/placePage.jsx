import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos]= useState(false);

  const[checkIn,setCheckIn]= useState('');
  const[checkOut,setCheckOut]= useState('');
  const[maxGuests,setMaxGuests]= useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

if (!place) return '';

if (showAllPhotos){
  return (
    <div className="absolute inset-0 bg-black min-h-screen ">
      <div className="bg-black p-8 grid gap-4">
        <h2 className="text-3xl">Photos of {place.title}</h2>
        <div>
          <button onClick={()=> setShowAllPhotos(false)} className="flex gap-1 py-2 px-4 rounded-2xl bg-black right-12 top-8 text-white fixed shadow shadow-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
close photos</button>
        </div>
        {place?.photos?.length>0 && place.photos.map(photo=>(
      <img src={'http://localhost:3000/uploads/' + photo} alt="" />
    ))}</div></div>
  )
}


  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      {place && (
        <>
          <h1 className="text-3xl">{place.title}</h1>
          <a className="my-2 block font-semibold underline flex gap-1 my-3" target="_blank" href={"https://maps.google.com/?q=" + place.address}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
{place.address}</a>
          
          <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
              {place.photos?.[0] && (
                <div>
                  <img className="aspect-square object-cover" src={"http://localhost:3000/uploads/" + place.photos[0]} alt="" />
                </div>
              )}
            </div>
            <div className="grid ">
              {place.photos?.[1] && (
                
                  <img className="aspect-square object-cover" src={"http://localhost:3000/uploads/" + place.photos[1]} alt="" />
                
              )}
              <div className=" overflow-hidden">
                {place.photos?.[2] && (
                  <div>
                    <img className="aspect-square object-cover relative top-2" src={"http://localhost:3000/uploads/" + place.photos[2]} alt="" />
                  </div>
                )}
              </div>
            </div></div>

            <button onClick={()=>setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500 flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
show more photos</button>
          </div>
                  

<div className="grid grid-cols-2 mt-8 gap-8">
<div><div className="my-4">
                    <h2 className="font-semibold text-2xl"> Description</h2>
                    {place.description}
                  </div>
  <b>Check-In-</b> {place.checkIn} <br />
  <b>Check-Out-</b> {place.checkOut} <br />
  <b>Max no of Guests-</b> {place.maxGuests}
  

</div>
  <div className="bg-white shadow p-4 ml-5 pl-5 rounded-2xl">
    <div className="text-2xl text-center mb-2">Price: ${place.price} / per night</div>
    <div className="border rounded-2xl">
    <div className=" mb-2  p-3 border-b">
      <label ><b>Check-In:</b> </label>
      <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
    </div>
    <div className="mb-2 p-3 ">
      <label ><b>Check-Out: </b></label>
      <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
    </div>
    <div className="mb-2 p-3 ">
      <label ><b>Max guests: </b></label>
      <input type="number" value={maxGuests}onChange={ev=>setMaxGuests(ev.target.value)}/>
    </div>
      </div>

      <button className="primary mt-4">book this place
      </button>
</div>

</div>

        </>
      )}
    </div>
  );
}
