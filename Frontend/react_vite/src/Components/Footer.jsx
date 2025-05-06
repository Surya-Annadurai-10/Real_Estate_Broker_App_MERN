import React from 'react'
import { MdOutlineVerticalAlignTop } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 relative flex md:flex-row flex-col items-center justify-center gap-1 md:gap-10 text-white text-center h-[60px] md:p-6 ">
    <p className='md:w-[50%] w-full  flex text-sm lg:text-md md:absolute left-5 items-center justify-center md:justify-start'>&copy; 2025 The SunEsates. All rights reserved.</p>
    <p className='w-[50%%] flex  text-sm lg:text-md  items-center justify-start'>Made with ♥️ by Surya Annadurai</p>
    <a href='#' className=' rounded-full fixed z-100 bottom-3 right-3 shadow-red-500  flex items-center justify-end'>
      <button className='w-[50px] border border-gray-300 h-[50px] grid place-items-center z-[200] cursor-pointer bg-slate-900 rounded-full'>
        <MdOutlineVerticalAlignTop className='p-1 text-[2.5rem]' />
      </button>
    </a>
  </footer>
  )
}

export default Footer