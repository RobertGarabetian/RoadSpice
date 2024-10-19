// Map.tsx
import React, { useEffect, useRef } from "react";
declare global {
  interface Window {
    initMap?: () => void; // Solves some typescript error i dont understand ngl
    google: any;
  }
}
function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKEY = import.meta.env.VITE_GOOGLE_MAPS_API;
  useEffect(() => {
    // Check if the script is already added to avoid duplicates
    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKEY}&loading=async&callback=initMap`;
      console.log(
        `https://maps.googleapis.com/maps/api/js?key=${apiKEY}&loading=async&callback=initMap`
      );
      script.async = true;
      // Define the initMap function
      window.initMap = function () {
        if (mapRef.current) {
          new window.google.maps.Map(mapRef.current, {
            center: { lat: 39.8283, lng: -98.5795 }, // center of US
            zoom: 3,
          });
        }
      };
      document.head.appendChild(script);
    } else if (window.google && mapRef.current) {
      // If script is already loaded, initialize the map directly
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 12,
      });
    }
    // Cleanup function
    return () => {
      // Optionally remove the script if you want to clean up
      // document.head.removeChild(script);
      // delete window.initMap;
    };
  }, []);
  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
}
export { Map };
