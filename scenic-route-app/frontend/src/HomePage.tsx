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
import { ResponseData } from "./types";
import ErrorPopup from "./ErrorPopup";
import TimeCard from "./TimeCard";

const HomePage = () => {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null); // Error state

  const handleError = (errorMessage: string) => {
    setError(errorMessage); // Set the error message
    console.log(error);
  };

  const handleCloseError = () => {
    setError(null); // Close the error popup
    console.log(error);
  };

  return (
    <div className="min-h-screen bg-background text-foreground w-screen">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-5xl font-bold my-6">RoadSpice</h1>

        {error ? (
          <ErrorPopup message={error} onClose={handleCloseError} />
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-full mt-12">
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

          <div className="md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-3xl">Route Map</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <Map locationInfo={responseData} onError={handleError} />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-3xl">Stops List</CardTitle>
              </CardHeader>
              <CardContent>
                <StopsList responseData={responseData} />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2">
            <Card className="w-full ">
              <CardHeader>
                <CardTitle className="text-3xl">Travel Time</CardTitle>
              </CardHeader>
              <CardContent className="">
                <TimeCard responseData={responseData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
