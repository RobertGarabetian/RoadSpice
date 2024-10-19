// src/App.jsx
import React from "react";
import {Map} from './Map'
import TravelPlanner from "./TravelPlanner";

declare global {
  interface Window {
    initMap?: () => void;
    google: any;
  }
}


const App = () => {

  return (
    <div className="App w-screen">
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="col-span-1 row-span-1">
          <TravelPlanner />
          <button
            // onClick={handleGetRoute}
            className="mt-4 p-2 bg-blue-500 text-white"
          >
            Get Route
          </button>
        </div>
        <div>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default App;
