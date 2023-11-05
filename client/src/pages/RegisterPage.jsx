
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
const[name, setName]= useState('');
const[email, setEmail]= useState('');
const[password, setPassword]= useState('');
const[phoneNumber, setPhoneNumber]= useState('');

async function registerUser(ev){
  ev.preventDefault(); 
  try{ await axios.post('/register',
  {
    name, 
    email,
    password,
    phoneNumber
  });
  alert('Registration sucessful, now you can login');}
  catch(e){
    alert('this email is already registered');
  }
 
}
  return(
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60"><h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto  " onSubmit={registerUser}>
      <input type="text"  placeholder="John Doe" value={name}
       onChange={ev=> setName(ev.target.value)}/>
        
        <input type="email"  placeholder="your@email.com"
         value={email}
         onChange={ev=> setEmail(ev.target.value)}/>
        <input type="password"  placeholder="password"
         value={password}
         onChange={ev=> setPassword(ev.target.value)}/>
        <input type="text"  placeholder="+91 123-456-789"
         value={phoneNumber}
         onChange={ev=> setPhoneNumber(ev.target.value)}/>
        
        <button className="primary">Register</button>
        <div>
          Already have an account ?
          <Link to={'/login'} className='underline text-bold'>Login</Link>
        </div>
      </form></div>
      
    </div>
  )
  
}