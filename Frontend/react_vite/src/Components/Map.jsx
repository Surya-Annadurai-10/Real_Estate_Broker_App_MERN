import { Marker, Popup } from "react-leaflet";
import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css"

const Map = ({
  latitude: lat,
  regularPrice: price,
  longitude: long,
  imageURLs: imgUrl,
  name: name,
  address : add,
  offer : offer
}) => {
  console.log(lat, long, "lat long");

  return (
    <>
      <MapContainer
        center={[lat, long]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ borderRadius: "10px" }}
        className="rounded-md w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>
            <div className="flex items-start gap-3 justify-center">
              <div className="w-[60px] h-[40px] rounded-md">
                {/* <img className="w-full h-full rounded-md" src={imgUrl[0].url} alt="" /> */}
              </div>
              <div className="w-[70%] flex items-start justify-start flex-col">
                <h1 className="font-semibold">{name}</h1>
                <h1 className="font-bold text-lg">$ {price}{offer ? <span className="font-semibold text-sm"> /month</span> : null}</h1>
               
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Map;
