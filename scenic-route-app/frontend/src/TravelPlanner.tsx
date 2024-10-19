import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";
import { Button } from "./components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
async function run(
  departure_city: string,
  departure_state: string,
  arrival_city: string,
  arrival_state: string,
  scale: number
) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: "say hi" }],
      },
    ],
  });

  const result = await chatSession.sendMessage(
    `Hello! I am traveling from ${departure_city}, ${departure_state} to ${arrival_city}, ${arrival_state} by car. On a scale of 1 to 100, 100 being the most willing and 1 being the least willing to go out of my way for the scenic stops, I am at a ${scale}. Can you give me a list of stops along the way and a short description of each.`
  );
  console.log(result.response.text());
}

export default function TravelPlanner() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [speedPreference, setSpeedPreference] = useState(50);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let departure_city: string = "";
    let departure_state: string = "";
    let arrival_city: string = "";
    let arrival_state: string = "";
    let scale = 10;
    run(departure_city, departure_state, arrival_city, arrival_state, scale);
    console.log("Form submitted", { departure, arrival, speedPreference });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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
              <Label htmlFor="departure">Departure</Label>
              <Input
                id="departure"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                placeholder="Enter departure location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival">Arrival</Label>
              <Input
                id="arrival"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                placeholder="Enter arrival location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preference">Speed vs. Scenery Preference</Label>
              <Slider
                id="preference"
                min={0}
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
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Plan Journey
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
