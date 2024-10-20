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


const App = () => {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

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
