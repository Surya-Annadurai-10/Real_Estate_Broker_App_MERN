import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), {
        animate: true,
        duration: 1
      });
    }
  }, [lat, lng, map]);

  return null;
};

export default RecenterMap;