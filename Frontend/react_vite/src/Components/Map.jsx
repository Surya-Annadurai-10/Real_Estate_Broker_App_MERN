import { Marker, Popup } from 'react-leaflet'
import React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
// import "leaflet/dist/leaflet.css"

const Map = ({lat , long}) => {
    console.log(lat , long , "lat long");
    
  return (
   <>
   <MapContainer  center={[lat, long]} zoom={7} scrollWheelZoom={true} style={{borderRadius:"10px"}} className='rounded-md w-full h-full'>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[lat, long]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
   </>
  )
}

export default Map