import React, { useEffect, useState } from "react";
import logo from "../assets/royal.png";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const stateUser  = useSelector(state => state.user);
  const [searchTerm , setSearchTerm] = useState("");
  const navigate = useNavigate();
  console.log(stateUser , "Stateuser");

  const handleSubmit = (e) => {
   e.preventDefault();

   const urlParams = new URLSearchParams(window.location.search);
   urlParams.set("searchTerm" , searchTerm);
   const searchQuery = urlParams.toString();
   navigate(`/search?${searchQuery}`)
   }

   useEffect(() =>{
      const urlParams = new URLSearchParams(location.search);
      const searchParams = urlParams.get("searchTerm");
      if(searchParams){
        setSearchTerm(searchParams)
      }
   },[location.search])
  
  
  return (
    <header className="w-full h-[10vh] bg-[#E2E8F0] px-10 flex items-center justify-between">
      <div>
        <div className="flex items-center  flex-col">
          <img className="w-[100px]" src={logo} alt="" />
          <h1 className="logo  text-md">Estates</h1>
        </div>
      </div>
      <div className="w-[33%]">
        <form className="flex items-center w-[100%] bg-[#F1F5F9] h-[45px] justify-center rounded-md">
            <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" className="w-[90%] p-2 h-[100%] outline-none border-none" type="text" />
            <GoSearch onClick={(e) => handleSubmit(e)} className="p-1.5 hover:bg-[#E2E8F0] hover:cursor-pointer hover:scale-[1.2] transition-all active:scale-[0.9]  rounded-full" style={{fontSize:"2.3rem" }} />
        </form>
       
      </div>
      <div className="flex items-center justify-center gap-10">
        <Link>
        <h1 className=" ">Home</h1>
        </Link>
        <Link>
        <h1 className=" ">About</h1>
        </Link>
        {console.log(stateUser)}

       {  
        stateUser.userData ? 
       <Link to={`/profile/${stateUser.userData._id}`}> <img className="w-[40px] h-[40px] rounded-full" src={stateUser.userData.avatar} alt="" /> </Link>
        :
        <>
         <Link to={"/login"} className="w-[100px] h-[40px] grid place-items-center rounded-md bg-slate-700 text-white">
           Login
        </Link>
        </>
       }
   
       
      </div>
    </header>
  );
};

export default Header;
