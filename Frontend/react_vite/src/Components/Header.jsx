import React from "react";
import logo from "../assets/royal.png";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-[10vh] bg-[#E2E8F0] px-10 flex items-center justify-between">
      <div>
        <div className="flex items-center  flex-col">
          <img className="w-[100px]" src={logo} alt="" />
          <h1 className="logo  text-md">Estates</h1>
        </div>
      </div>
      <div className="w-[33%]">
        <div className="flex items-center w-[100%] bg-[#F1F5F9] h-[45px] justify-center rounded-md">
            <input placeholder="Search" className="w-[90%] p-2 h-[100%] outline-none border-none" type="text" />
            <GoSearch className="p-1.5 hover:bg-[#E2E8F0] hover:cursor-pointer hover:scale-[1.2] transition-all active:scale-[0.9]  rounded-full" style={{fontSize:"2.3rem" }} />
        </div>
       
      </div>
      <div className="flex items-center justify-center gap-10">
        <Link>
        <h1 className=" ">Home</h1>
        </Link>
        <Link>
        <h1 className=" ">About</h1>
        </Link>
        <Link>
        <div className="w-[50px] h-[50px] grid place-items-center rounded-full bg-[purple] text-white">
            <h1>S</h1>
        </div>
        </Link>
       
      </div>
    </header>
  );
};

export default Header;
