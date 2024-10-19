// src/App.jsx
import React, { useEffect, useRef } from "react";
import {
  loadGoogleMapsScript,
  initializeMap,
  getShortestRoute,
} from "../../backend/maps";
import TravelPlanner from "./TravelPlanner";

const App = () => {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API; // Access env variable

  useEffect(() => {
    // Initialize the map after the script loads
    // window.initMap = () => initializeMap(mapRef);

    // Load the Google Maps script
    loadGoogleMapsScript(apiKey, "initMap");
  }, [apiKey]);

  const handleGetRoute = async () => {
    const route = await getShortestRoute("Los Angeles", "San Francisco");
    console.log("Route:", route);
  };

  return (
    <div className="App w-screen">
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="col-span-1 row-span-1">
          <TravelPlanner />
          <button
            onClick={handleGetRoute}
            className="mt-4 p-2 bg-blue-500 text-white"
          >
            Get Route
          </button>
        </div>
        <div
          id="map"
          ref={mapRef}
          className="col-span-1 row-span-1 bg-slate-400"
          style={{ height: "100vh", width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default App;
