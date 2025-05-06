import React from 'react'
import loader from "../assets/loader.svg"

const Loading = () => {
  return (
    <div className='w-full h-[90vh]  flex items-center justify-center flex-col'>
        <img className='w-[100px]' src={loader} alt="" />
        <h1>Loading...</h1>
    </div>
  )
}

export default Loading