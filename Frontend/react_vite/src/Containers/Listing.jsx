import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { MdLocationPin } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import Contact from "../Components/Contact";
import Map from "../Components/Map";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  console.log(id, "params");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const stateUser = useSelector((state) => state.user);
  const [listinData, setListingData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    latitude:  13.0682,
    longitude: 77.5967,
    imageURLs: [],
    userRef: stateUser.userData._id,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/listing/edit-listing/${id}`, {
        method: "GET",
        headers: {
          "Contact-Type": "application/json",
        },
      });

      const resData = await res.json();
      console.log(resData.data, "listing Page Data");
      setListingData(resData.data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (listinData) {
      console.log(listinData.imageURLs, "imageURLs");
    }
  }, [listinData]);

  return (
    <div className="w-full min-h-[90vh] bg-[#F1F5F1]">
      {loading && <p>Loading...</p>}
      {error && <p>Something went Wrong...</p>}
      {listinData && !loading && !error ? (
        <>
          <div>
            <Swiper navigation>
              {listinData?.imageURLs.map((ele, i) => {
                return (
                  <SwiperSlide key={ele.url}>
                    <div className="w-full h-[500px]">
                      <img
                        className="w-full h-full object-cover"
                        src={ele.url}
                        alt={ele.fileName}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="flex pb-5 items-center lg:flex-row flex-col justify-center">
          <div className="lg:w-[50%] w-[90%]">
          <div className="md:max-w-[100%] w-[100%]   mx-auto">
            <h1 className="font-semibold text-2xl my-8">
              {listinData.name} - ${" "}
              {listinData.regularPrice.toLocaleString("en-US")}{" "}
              {listinData.type == "rent" ? "/ month" : null}
            </h1>
            <div className="flex items-center justify-start">
              <MdLocationPin className="text-[16px] text-green-700" />
              <p className="text-slate-700 text-sm">{listinData.address}</p>
            </div>
            <div className="flex py-4 items-center justify-start gap-3">
              <p className=" py-1 w-[200px] text-center inline-block rounded-md bg-red-900 text-white capitalize">
                for <span className="capitalize">{listinData.type}</span>
              </p>
              {listinData.discountPrice > 0 ? (
                <p className=" py-1 w-[200px] text-center inline-block rounded-md bg-green-900 text-white  capitalize">
                  ${listinData.regularPrice - listinData.discountPrice} discount
                </p>
              ) : null}
            </div>
            <p className="text-slate-700 text-sm">
              <strong className="text-[14px] text-[black]">
                Description -{" "}
              </strong>
              {listinData.description}
            </p>
            <ul className="flex py-5 gap-3 md:gap-5 text-sm items-center justify-start ">
              <li className="flex text-green-900 items-center gap-1">
                <FaBed className="text-[16px]" />
                <p className="text-sm font-semibold">
                  {listinData.bedrooms < 1
                    ? "1 Bed"
                    : `${listinData.bedrooms} Beds`}
                </p>
              </li>
              <li className="flex text-green-900 items-center gap-1">
                <FaBath className="text-[16px]" />
                <p className="text-sm font-semibold">
                  {listinData.bathrooms < 1
                    ? "1 Bath"
                    : `${listinData.bathrooms} Baths`}
                </p>
              </li>
              <li className="flex text-green-900 items-center gap-1">
                <FaParking className="text-[16px]" />
                <p className="text-sm font-semibold">
                  {listinData.parking ? "Parking Spot" : `No Parking`}
                </p>
              </li>
              <li className="flex text-green-900 items-center gap-1">
                <FaChair className="text-[16px]" />
                <p className="text-sm font-semibold">
                  {listinData.furnished ? "Furnished" : `Unfurnished`}
                </p>
              </li>
            </ul>
          </div>
          <Contact listing={listinData} />
          </div>
          <div className="lg:w-[50%] w-[90%] h-[45vh]">
            <Map {...listinData} lat={listinData.latitude} long={listinData.longitude} />
          </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Listing;
