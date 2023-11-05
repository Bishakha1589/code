import { useState,useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";


export default function PlacesPage() {
  const [places, setPlaces]= useState([]);
  useEffect(()=>{
    axios.get('/user-places').then(({data})=>{
      setPlaces(data);
    });},[]);

  

  return (
   
    <div> <AccountNav/>
      
        <div className="text-center ">
          <br />
     
        </div>
        <div className="mt-4">
          {places.length>0 && places.map(place =>(
            <Link to={'/account/places/'+place._id} className="flex items-center gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer m-3">
              <div className=" flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl">
                {place.photos.length > 0 && (
                  <img className="object-cover rounded-2xl" src={'http://localhost:3000/uploads/'+place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink">     
                <h2 className="text-xl ">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p></div>
         
              
            </Link>
         ) )}
        </div>
      
    </div>
  );
}
