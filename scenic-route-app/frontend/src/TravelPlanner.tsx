import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";
import { Button } from "./components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import StopsList from "./StopsList";

export default function TravelPlanner({ setResponseData }: any) {
  const [departureCity, setDepartureCity] = useState("");
  const [departureState, setDepartureState] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [arrivalState, setArrivalState] = useState("");
  const [speedPreference, setSpeedPreference] = useState(50);
  const [loading, setLoading] = useState(false);

  const apiKey: string = import.meta.env.VITE_GEMINI_API; // Make sure to set your API key in your .env file

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const scale = speedPreference;

    if (!departureCity || !departureState || !arrivalCity || !arrivalState) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);

      const result = await model.generateContent(
        `Hello! I am traveling from ${departureCity}, ${departureState} to ${arrivalCity}, ${arrivalState} by car. On a scale of 1 to 100, 100 being the most willing and 1 being the least willing to go out of my way for the scenic stops, I am at a ${scale}. Please provide a list of stops along the way, each with a short description, formatted as JSON. Use the following structure:

        {
          "stops": [
            {
              "name": "Stop Name",
              "description": "Description of the stop.",
              "willingness_score": number,
              "coordinates": {
                "lat": number,
                "long": number
              }
            },
            // ... more stops ...
          ]
        }
        
        Please provide only the JSON output without additional text. Avoid adding any text before the first curly brace of the json and any text after the last curly brace of the json`
      );

      const response = result.response.text();
      console.log(response);
      try {
        const jsonContent = response.replace(/`/g, "").trim();
        console.log(jsonContent);
        const data = JSON.parse(jsonContent);

        setResponseData(data);
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.error("Failed to parse response:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Plan Your Journey</CardTitle>
          <CardDescription>
            Balance speed and scenery for your perfect trip.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="departureCity">Departure City</Label>
              <Input
                id="departureCity"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                placeholder="Enter departure city"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureState">Departure State</Label>
              <Input
                id="departureState"
                value={departureState}
                onChange={(e) => setDepartureState(e.target.value)}
                placeholder="Enter departure state"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalCity">Arrival City</Label>
              <Input
                id="arrivalCity"
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                placeholder="Enter arrival city"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalState">Arrival State</Label>
              <Input
                id="arrivalState"
                value={arrivalState}
                onChange={(e) => setArrivalState(e.target.value)}
                placeholder="Enter arrival state"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preference">Speed vs. Scenery Preference</Label>
              <Slider
                id="preference"
                min={1}
                max={100}
                step={1}
                value={[speedPreference]}
                onValueChange={(value) => setSpeedPreference(value[0])}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>More Scenic</span>
                <span>Faster</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Planning..." : "Plan Journey"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
