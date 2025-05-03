import React from 'react'
import { useParams } from 'react-router-dom';

const Listing = () => {
    const {id} = useParams();
    console.log(id , "params");
    
  return (
    <div className='w-full h-[90vh] bg-red-600'>Listing</div>
  )
}

export default Listing
