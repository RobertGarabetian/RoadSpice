import TravelPlanner from "./TravelPlanner";
import React from "react";

function App() {
  return (
    <div className="App w-screen">
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="col-span-1 row-span-1">
          <TravelPlanner />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-400"></div>
      </div>
    </div>
  );
}

export default App;
