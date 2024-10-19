// src/App.jsx
// import React, { useEffect, useRef } from "react";
// import {
//   loadGoogleMapsScript,
//   initializeMap,
//   getShortestRoute,
// } from "../../backend/maps";
import { Map } from "./Map";
import { useState } from "react";
import TravelPlanner from "./TravelPlanner";
import StopsList from "./StopsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
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
    <div className="min-h-screen bg-background text-foreground w-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Travel Route Planner</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 md:row-span-1">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-3xl">Plan Your Journey</CardTitle>
                <CardDescription>
                  Balance speed and scenery for your perfect trip.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TravelPlanner setResponseData={setResponseData} />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Route Map</CardTitle>
              </CardHeader>
              <CardContent className="h-auto">
                <Map locationInfo={responseData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Stops List</CardTitle>
              </CardHeader>
              <CardContent>
                <StopsList responseData={responseData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
