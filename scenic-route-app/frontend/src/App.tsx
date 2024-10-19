// src/App.jsx
// import React, { useEffect, useRef } from "react";
// import {
//   loadGoogleMapsScript,
//   initializeMap,
//   getShortestRoute,
// } from "../../backend/maps";
import { useState } from "react";
import TravelPlanner from "./TravelPlanner";
import StopsList from "./StopsList";
interface ResponseData {
  stops: Stop[];
}
interface Stop {
  name: string;
  description: string;
  willingness_score: number;
}

const App = () => {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  // const mapRef = useRef(null);
  // const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API; // Access env variable

  // useEffect(() => {
  //   // Initialize the map after the script loads
  //   // window.initMap = () => initializeMap(mapRef);

  //   // Load the Google Maps script
  //   loadGoogleMapsScript(apiKey, "initMap");
  // }, [apiKey]);

  // const handleGetRoute = async () => {
  //   // MAKE ME NOT HARD CODED
  //   const route = await getShortestRoute("Los Angeles", "San Francisco");
  //   console.log("Route:", route);
  // };

  return (
    <div className="App w-screen">
      <div className="grid grid-cols-3 grid-rows-2">
        <div className="col-span-1 row-span-2">
          <TravelPlanner setResponseData={setResponseData} />
          {/* <button
            onClick={handleGetRoute}
            className="mt-4 p-2 bg-blue-500 text-white"
          >
            Get Route
          </button> */}
        </div>
        <div className="row-span-1 col-span-2 bg-red-700">
          {/* <div
            id="map"
            ref={mapRef}
            className="col-span-1 row-span-1 bg-slate-400"
            style={{ height: "100vh", width: "100%" }}
          ></div> */}
        </div>
        <div className="row-span-1 col-span-2 bg-slate-400">
          {/* List of stops */}
          <StopsList responseData={responseData} />
        </div>
      </div>
    </div>
  );
};

export default App;
