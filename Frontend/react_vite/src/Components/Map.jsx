import { Marker, Popup } from "react-leaflet";
import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import RecenterMap from "./RecenterMap";
// import "leaflet/dist/leaflet.css"

const Map = (props) => {
  console.log(props.imageURLs[0]?.url
    , "props from maps");

    // const map = useMap();

    // useEffect(() => {
    //   if (props.latitude && props.longitude) {
    //     map.setView([props.latitude ,  props.longitude], map.getZoom(), {
    //       animate: true,
    //       duration: 1
    //     });
    //   }
    // }, [props.latitude,  props.longitude, map]);
  
   

  return (
    <>
      <MapContainer
        center={[props.latitude, props.longitude]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ borderRadius: "10px" }}
        className="rounded-md w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[props.latitude, props.longitude]}>
          <Popup>
            <div className="flex items-start gap-3 justify-center">
              <div className="w-[60px] h-[40px] rounded-md">
                <img className="w-full h-full rounded-md" src={props.imageURLs[0]?.url} alt={props.name} />
              </div>
              <div className="w-[70%] flex items-start justify-start flex-col">
                <h1 className="font-semibold">{props.name}</h1>
                <h1 className="font-bold text-lg">$ {props.regularPrice}{props.offer ? <span className="font-semibold text-sm"> /month</span> : null}</h1>
               
              </div>
            </div>
          </Popup>
        </Marker>
        <RecenterMap lat={props.latitude} lng={props.longitude} />
      </MapContainer>
    </>
  );
};

export default Map;
