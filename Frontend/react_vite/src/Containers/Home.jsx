import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className='w-[100%] bg-[#F1F5F1]  min-h-[100vh]'>
      {/* top */}
      <div className='w-[100%] h-[55vh]  '>
        <div className='w-[70%] mx-auto h-full gap-5 flex items-start justify-center flex-col'>
          <h1 className='text-6xl font-bold text-slate-700 leading-17.5'>Find your next <span className='text-slate-500'>perfect</span> <br /> place with ease</h1>
          <p className='text-slate-400 text-sm'>Sun Estates will help you find your home fast, easy and comfortable. <br /> Our expert support are always available.</p>
          <Link to={"/search"} className={"text-slate-700 text-sm font-semibold"} >
          <button className='px-6 py-4 bg-slate-700 text-[#F1F5F1] cursor-pointer hover:scale-[1.05] hover:bg-slate-600 transition-all active:scale-[0.95] rounded-md '>Let's Start now...</button></Link>
      
        </div>
      </div>
      {/* swiper */}
      {/* last */}
    </main>
  )
}

export default Home