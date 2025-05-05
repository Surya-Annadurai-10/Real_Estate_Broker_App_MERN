import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper , SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import { Navigation , Autoplay } from 'swiper/modules'
import "swiper/css/bundle"
import Cards from '../Components/Cards'


const Home = () => {
  SwiperCore.use([Navigation]);
  //offer , rent , sale
  const [recentOfferListings, setRecentOfferListings] = useState([])
  const [recentRentListings, setRecentRentListings] = useState([])
  const [recentSaleListings, setRecentSaleListings] = useState([])
  const [screenWidth , setScreenWidth] = useState(window.innerWidth)

  const [swiperslides , setSwiperSlides] = useState(4);
  // console.log(screenWidth , "inner width---------------------------------------------------");

  useEffect(() =>{
    if(screenWidth){
      if(screenWidth < 670){
        console.log("1 eventListener---------");
        setSwiperSlides(1);
      }else if(screenWidth < 860){
        setSwiperSlides(2)
        
      }else{
        console.log("3 event listener-------------");
        setSwiperSlides(4)
      }
    }
  } ,[screenWidth])
 
  useEffect(() =>{
   
    const handleResize = () =>{
      setScreenWidth(window.innerWidth);

    }

    window.addEventListener("resize" , handleResize)

    return () => window.removeEventListener("resize" , handleResize);
    
  },[])

  useEffect(() =>{

    const fetchData = async() =>{
      const rentRes = await fetch("/api/listing/search?type=rent")
      const offerRes = await fetch("/api/listing/search?offer=true")
      const saleRes = await fetch("/api/listing/search?type=sale")


      const rentResData = await rentRes.json();
      const offerResData = await offerRes.json();
      const saleResData = await saleRes.json();
      console.log( "Offer",offerResData);
      console.log("Rent" , rentResData);
      console.log("sale",saleResData);
      if(!rentResData || !offerResData || !saleResData.success){
        console.log("Error while fetching the rent data" , rentResData.message);
        console.log("Error while fetching the offer data" , offerResData.message);
        console.log("Error while fetching the sale data" , saleResData.message);
        return
      }

      setRecentOfferListings(offerResData.listings)
      setRecentRentListings(rentResData.listings)
      setRecentSaleListings(saleResData.listings)
      console.log("Data fetched successfully rent , offer , sale");
      
    }

    fetchData()
  } ,[])
  return (
    <main className='w-[100%] bg-[#F1F5F1]  min-h-[100vh]'>
      {/* top */}
      <div className='w-[100%] h-[55vh]  '>
        <div className='md:w-[70%] w-[90%] mx-auto h-full gap-5 flex items-start justify-center flex-col'>
          <h1 className='lg:text-6xl md:text-5xl text-3xl font-bold text-slate-700 md:leading-15 lg:leading-17.5'>Find your next <span className='text-slate-500'>perfect</span> <br /> place with ease</h1>
          <p className='text-slate-400 md:text-sm text-[10px]'>Sun Estates will help you find your home fast, easy and comfortable. <br /> Our expert support are always available.</p>
          <Link to={"/search"} className={"text-slate-700 text-sm font-semibold"} >
          <button className='px-6 py-4 bg-slate-700 text-[#F1F5F1] cursor-pointer hover:scale-[1.05] hover:bg-slate-600 transition-all active:scale-[0.95] rounded-md '>Let's Start now...</button></Link>
      
        </div>
      </div>
      {/* swiper */}
      <div className='\'>
        <Swiper
         modules={[Autoplay]}
         autoplay={{
           delay: 3000,
           disableOnInteraction: false,
         }}
         loop={true}
         spaceBetween={30}
         slidesPerView={1}
        >

               {
                recentOfferListings.length > 0 ?
                <>
                {
                  recentOfferListings.map((ele , i) =>{
                    return <SwiperSlide className='cursor-grab active:cursor-grabbing'  key={`${ele.imageURLs[1].url}_${i}`}>
                      <div className='h-[60vh]' >
                      <img className='w-full h-full object-cover object-center' src={ele.imageURLs[0].url} alt="" />
                    </div>
                    </SwiperSlide>
                  })
                }
                </>
                
                : null
               }

        </Swiper>
      </div >


      {/* last */}
    <div className='py-5'>
    <div className='p-5 w-[90%] mx-auto ' >
      <h1 className='font-semibold pt-5 text-2xl text-slate-800'>Recent offers</h1>
      <Link to={"/search?offer=true"} >
      <p className='pb-5 text-green-700 text-sm hover:underline underline-offset-3'>Show more offers</p>
      </Link>
      <div className=''>
        <Swiper
         modules={[Autoplay]}
         autoplay={{
           delay: 3000,
           disableOnInteraction: false,
         }}
         loop={true}
         spaceBetween={30}
         slidesPerView={swiperslides}
        >

               {
                recentOfferListings.length > 0 ?
                <>
                {
                  recentOfferListings.map((ele , i) =>{
                    return <SwiperSlide className='cursor-grab active:cursor-grabbing'  key={`${ele.imageURLs[1].url}_${i}`}>
                      <Cards {...ele} />
                    </SwiperSlide>
                  })
                }
                </>
                
                : null
               }

        </Swiper>
      </div>
      </div>

      <div className='p-5 w-[90%] mx-auto ' >
      <h1 className='font-semibold pt-5 text-2xl text-slate-800'>Recent places for Rent</h1>
      <Link to={"/search?type=rent"} >
      <p className='pb-5 text-green-700 text-sm hover:underline underline-offset-3'>Show more places for rent</p>
      </Link>
      <div className=''>
        <Swiper
         modules={[Autoplay]}
         autoplay={{
           delay: 3000,
           disableOnInteraction: false,
         }}
         loop={true}
         spaceBetween={30}
         slidesPerView={swiperslides}
        >

               {
                recentRentListings.length > 0 ?
                <>
                {
                  recentRentListings.map((ele , i) =>{
                    return <SwiperSlide className='cursor-grab active:cursor-grabbing'  key={`${ele.imageURLs[1].url}_${i}`}>
                      <Cards {...ele} />
                    </SwiperSlide>
                  })
                }
                </>
                
                : null
               }

        </Swiper>
      </div>
      </div>

      <div className='p-5 w-[90%] mx-auto ' >
      <h1 className='font-semibold pt-5 text-2xl text-slate-800'>Recent places for sale</h1>
      <Link to={"/search?type=sale"} >
      <p className='pb-5 text-green-700 text-sm hover:underline underline-offset-3'>Show more places for sale</p>
      </Link>
      <div className=''>
        <Swiper
         modules={[Autoplay]}
         autoplay={{
           delay: 3000,
           disableOnInteraction: false,
         }}
         loop={true}
         spaceBetween={30}
         slidesPerView={swiperslides}
        >

               {
                recentSaleListings.length > 0 ?
                <>
                {
                  recentSaleListings.map((ele , i) =>{
                    return <SwiperSlide className='cursor-grab active:cursor-grabbing'  key={`${ele.imageURLs[1].url}_${i}`}>
                      <Cards {...ele} />
                    </SwiperSlide>
                  })
                }
                </>
                
                : null
               }

        </Swiper>
      </div>
      </div>
    </div>
    </main>
  )
}

export default Home