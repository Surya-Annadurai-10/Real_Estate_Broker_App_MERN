import React, { useEffect, useState } from "react";
import logo from "../assets/royal.png";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSun } from "react-icons/fa";
import { motion } from "motion/react";
import { IoSearch } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClear } from "react-icons/md";

const Header = () => {
  const stateUser = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showOptions , setShowOptions] = useState(false);
  const [showSearch , setShowSearch ] = useState(false);
  console.log(stateUser, "Stateuser");

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParams = urlParams.get("searchTerm");
    if (searchParams) {
      setSearchTerm(searchParams);
    }
  }, [location.search]);

  const handleShow = (e) =>{
    e.stopPropagation();
    setShowOptions(!showOptions)
  }

  const handleShowSearch = (e) =>{
    e.stopPropagation();
    setShowSearch(!showSearch)
  }

  return (
    <header className="w-full   h-[10vh] sticky top-0 bg-slate left-0 right-0 z-100 shadow-[0px_1px_1px_#CAD5E2] bg-[#E2E8F0]  flex items-center  justify-between px-3  lg:justify-evenly">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <HiMenuAlt2 onClick={() => {setShowOptions(!showOptions)
            setShowSearch(false)
          }} className="text-3xl text-slate-700 active:scale-[0.90]" />
        </div>
      
        <Link to={"/"} className="flex items-center  flex-col">
          <div className="flex items-center justify-center">
            <motion.div
              animate={{
                rotate: 360,
              
                
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <FaSun className="lg:text-4xl text-4xl  text-slate-700" />
            </motion.div>
            <h1 className="lg:text-2xl text-xl font-bold text-slate-500">
              Sun<span className="text-slate-700 font-bold">Estates</span>
            </h1>
          </div>
        </Link>
      </div>
      <div className="lg:w-[17%] md:block hidden">
        <form className="flex border border-gray-300 items-center w-[100%] bg-[white] h-[45px] justify-center rounded-md">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-[90%] p-2 b h-[100%] outline-none "
            type="text"
          />
          <GoSearch
            onClick={(e) => handleSubmit(e)}
            className="p-1.5 hover:bg-[#E2E8F0] hover:cursor-pointer hover:scale-[1.2] transition-all active:scale-[0.9]  rounded-full"
            style={{ fontSize: "2.3rem" }}
          />
        </form>
      </div>
    
      
      <div className="flex items-center justify-center md:gap-10 gap-7">
      <div  onClick={() => {setShowSearch
      (!showSearch)
      setShowOptions(false)
      }} className="md:hidden block">
          <IoSearch className="text-3xl text-slate-700"/>
        </div>
        <Link className="hidden md:block" to={"/"}>
          <h1 className="font-semibold ">Home</h1>
        </Link>
        <Link className="hidden md:block" to={"/about"}>
          <h1 className="font-semibold ">About</h1>
        </Link>
        {
      showOptions ? 
      <div onClick={(e) => handleShow(e)} className="fixed top-[11%] left-0 w-full h-[89%] z-[100]">
     
       <div className="absolute md:hidden  overflow-hidden flex items-center justify-center flex-col left-1 text-slate-700   z-100 w-[98%]  rounded-2xl bg-[white] shadow-[1px_1px_10px_#c6c6c6] ">
      <MdClear onClick={() => setShowOptions(!showOptions)} className="absolute top-1 right-1 text-2xl" />
      <Link className="py-3 w-full text-center active:bg-gray-300  hover:bg-gray-100 border-gray-300  border-b-1" to={"/"}>
        <h1 className="font-semibold  w-full h-full  ">Home</h1>
      </Link>
      <Link className="py-3 hover:bg-gray-100  w-full text-center active:bg-gray-200 "  to={"/about"}>
        <h1 className="font-semibold ">About</h1>
      </Link>
      </div> 

      </div> : null
           }
             {
      showSearch ? 
      // <>{/* <div className=" fixed left-0 top-0 right-0 bottom-0 bg-red-300 w-full h-[100vh] z-10">
      //     <h1>home</h1>
      // </div>
      // </> : null */}
      <div onClick={(e) => handleShowSearch(e)} className="fixed  top-[11%] left-0 bottom-0 right-0 w-full h-[89%] z-100">
     
       <div className="absolute md:hidden  overflow-hidden flex items-center justify-center flex-col left-1 text-slate-700   z-100 w-[98%]  rounded-2xl bg-[white] shadow-[1px_1px_10px_#c6c6c6] ">
      {/* <MdClear onClick={() => setShowSearch(!showSearch)} className="absolute top-1 right-1 text-2xl" /> */}
      <form onSubmit={(e) => handleSubmit(e)} className="flex border border-gray-300 items-center w-[100%] bg-[white] h-[55px] justify-center rounded-md">
          <input
          onClick={(e) => e.stopPropagation()}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-[90%] p-2 b h-[100%] outline-none "
            type="text"
          />
          <GoSearch
            onClick={(e) => handleSubmit(e)}
            className="p-1.5 hover:bg-[#E2E8F0] hover:cursor-pointer hover:scale-[1.2] transition-all active:scale-[0.9]  rounded-full"
            style={{ fontSize: "2.3rem" }}
          />
        </form>
      </div> 

      </div> : null
           }
        {console.log(stateUser)}

        {stateUser.userData ? (
          <Link to={`/profile/${stateUser.userData._id}`}>
            {" "}
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={stateUser.userData.avatar}
              alt=""
            />{" "}
          </Link>
        ) : (
          <>
            <Link
              to={"/login"}
              className="w-[100px] h-[40px] grid place-items-center rounded-md bg-slate-700 text-white"
            >
              Login
            </Link>
          </>
        )}
      </div>
      {/* <div>
      {
      showSearch ? <>
      <div className=" fixed left-0 top-0 right-0 bottom-0 bg-red-300 w-full h-[100vh] z-10">
          <h1>home</h1>
      </div>
      </> : null
      // <div onClick={(e) => handleShowSearch(e)} className="fixed bg-red-300 w-full h-[89%] z-100">
     
      //  <div className="absolute md:hidden  overflow-hidden flex items-center justify-center flex-col left-1 text-slate-700   z-100 w-[98%]  rounded-2xl bg-[white] shadow-[1px_1px_10px_#c6c6c6] ">
      // <MdClear onClick={() => setShowSearch(!showSearch)} className="absolute top-1 right-1 text-2xl" />
      // <form className="flex border border-gray-300 items-center w-[100%] bg-[white] h-[45px] justify-center rounded-md">
      //     <input
      //       onChange={(e) => setSearchTerm(e.target.value)}
      //       placeholder="Search"
      //       className="w-[90%] p-2 b h-[100%] outline-none "
      //       type="text"
      //     />
      //     <GoSearch
      //       onClick={(e) => handleSubmit(e)}
      //       className="p-1.5 hover:bg-[#E2E8F0] hover:cursor-pointer hover:scale-[1.2] transition-all active:scale-[0.9]  rounded-full"
      //       style={{ fontSize: "2.3rem" }}
      //     />
      //   </form>
      // </div> 

      // </div> : null
           }
      </div> */}
    </header>
  );
};

export default Header;
