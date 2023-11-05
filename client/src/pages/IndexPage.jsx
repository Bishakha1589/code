import { Link } from "react-router-dom";
import Header from "../header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function IndexPage(){
  const [places, setPlaces]= useState([]);
  useEffect(()=>{
    axios.get('/places').then(response=>{
      setPlaces([...response.data,...response.data]);
    });
  },[]);
  return(
  
  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 gap-y-8">
{places.length>0 && places.map(place=>(
  <Link to ={'/place/'+place._id}>
    <div className="bg-gray-500 rounded-2xl flex mb-1"> {place.photos?.[0] &&(
      <img className="rounded-2xl aspect-square object-cover" src={"http://localhost:3000/uploads/"+place.photos?.[0]} alt=""/>
    )}</div>
     <h2 className="font-bold ml-1">{place.address}</h2>
    <h3 className="text-md ml-1 ">{place.title}</h3>
     
      <div className="ml-1 mt-1">
        <span className="font-bold">${place.price}</span> per night
      </div>
    
  </Link>
))}
</div>)

}
