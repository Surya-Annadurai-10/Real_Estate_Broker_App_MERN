import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    console.log(listing ,"listing from contact component");
    const [user , setUser] = useState({});
    const [message , setMessage] = useState("");
    const [contactLandlord , setContactLandlord] = useState(false);
console.log(user , "USER FROM CONTAT PAGE");

    useEffect(() =>{
    const fetchData = async() =>{
       try {
        const res = await fetch(`/api/user/getuser/${listing.userRef}`)
        const resData = await res.json();
        setUser(resData.data);
        console.log(resData , "USER FROM CONTAT PAGE");
        
       } catch (error) {
          console.log(error, "Error while fethcing the user im contact component");
          
       }
   
    }

    fetchData()
},[])

  return (
   <div className='w-full grid place-items-center'>
    {
        contactLandlord ? <div className='md:w-[52%] w-[93%] mx-auto '>
        <h1>Contact <strong>{user?.username} </strong> for <strong>{listing.name}</strong></h1>
         <textarea onChange={(e) => setMessage(e.target.value)} placeholder='Enter your message here..' name="" className='w-full rounded-xl border min-h-[100px]  bg- p-2 my-2 border-gray-300' id=""></textarea>
         <Link to={`mailto:${user.email}?subject=Regarding ${listing.name}&body=${message}`} >
         <button className='w-full hover:bg-slate-600 cursor-pointer mb-4 active:scale-[0.95] rounded-md h-[40px] bg-slate-700 text-white'>Send Message</button></Link>
   
    </div> :  <button onClick={() => setContactLandlord(true)} className=' m-auto hover:bg-slate-600 md:w-[52%] mb-4 w-[93%] cursor-pointer active:scale-[0.95] rounded-md h-[40px] bg-slate-700 text-white'>Contact Landlord</button>
    }
   </div>
  )
}

export default Contact