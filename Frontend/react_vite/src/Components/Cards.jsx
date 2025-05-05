import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Cards = (props) => {

    // console.log(props , "props");
    
  return (
   <Link to={`/listing/${props._id}`}>
    <div  className='w-[320px] rounded-md my-3 hover:scale-[1.05] transition-all hover:shadow-[0px_0px_10px_grey] cursor-pointer  bg-[#ffffff] shadow-[0px_0px_5px_#afafaf] h-[400px]'>
        <div className='w-full h-[55%] overflow-hidden '>
            <img className='w-full h-full rounded-md transition-all hover:scale-[1.05]' src={props.imageURLs[0].url} alt={props.name} />
        </div>
        <div className='p-3 '>
            <h1 className='py-4 line-clamp-1font-semibold'>{props.name}</h1>
             <div className='flex gap-1'>
                <IoLocationSharp className=' text-green-600'/>
                <p className='pb-3 text-[11px] text-gray-700'>{props.address}</p>
             </div>
            <p className='text-[10px] line-clamp-1 pb-3 text-gray-700'>{props.description}</p>
             <h1 className='py-3  font-semibold text-[#646464]'>$ {props.regularPrice.toLocaleString("en-US")} {props.type == "rent" ? "/ month" : null}</h1>
             <p className='font-semibold text-[11px]'>{props.bedrooms == 1 ? `1 Bed` :`${props.bedrooms} Beds` } {props.bathrooms == 1 ?   `1 Bath` : `${props.bathrooms} Baths`}</p>
        </div>
    </div>
   </Link>
  )
}

export default Cards