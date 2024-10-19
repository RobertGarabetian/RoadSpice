import { useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";
import { Button } from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card";

export default function Component() {
  const [speedPreference, setSpeedPreference] = useState(50);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically handle the form submission
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Plan Your Journey</CardTitle>
          <CardDescription>
            Balance speed and scenery for your perfect trip.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="departure">Departure</Label>
                <Input
                  id="departure"
                  placeholder="Enter departure location"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrival">Arrival</Label>
                <Input
                  id="arrival"
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
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>More Scenic</span>
                  <span>Faster</span>
                </div>
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
