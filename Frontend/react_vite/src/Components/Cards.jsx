import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

const Cards = (props) => {

    console.log(props.imageURLs[0].url , "props");
    
  return (
    <div className='w-[320px] cursor-pointer rounded-md bg-[white] shadow-[0px_0px_5px_#afafaf] h-[400px]'>
        <div className='w-full h-[55%] overflow-hidden '>
            <img className='w-full h-full rounded-md transition-all hover:scale-[1.05]' src={props.imageURLs[1].url} alt={props.name} />
        </div>
        <div className='p-3 '>
            <h1 className='py-4 font-semibold'>{props.name}</h1>
             <div className='flex gap-1'>
                <IoLocationSharp className=' text-green-600'/>
                <p className='pb-3 text-[11px] text-gray-700'>{props.address}</p>
             </div>
            <p className='text-[10px] line-clamp-2 pb-3 text-gray-700'>{props.description}</p>
             <h1 className='pb-2 font-semibold text-[#646464]'>{props.regularPrice} {props.offer ? "/ month" : null}</h1>
             <p className='font-semibold text-[11px]'>{props.bedrooms == 1 ? `1 Bed` :`${props.bedrooms} Beds` } {props.bathrooms == 1 ?   `1 Bath` : `${props.bathrooms} Baths`}</p>
        </div>
    </div>
  )
}

export default Cards