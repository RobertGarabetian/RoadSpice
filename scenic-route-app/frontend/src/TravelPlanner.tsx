import React, { useState } from "react";

export default function TravelPlanner() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [speedPreference, setSpeedPreference] = useState(50);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the form submission
    console.log("Form submitted", { departure, arrival, speedPreference });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Plan Your Journey</h2>
        <p className="text-gray-600 mb-6">
          Balance speed and scenery for your perfect trip.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="departure"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departure
            </label>
            <input
              type="text"
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter departure location"
              required
            />
          </div>

          <div>
            <label
              htmlFor="arrival"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Arrival
            </label>
            <input
              type="text"
              id="arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter arrival location"
              required
            />
          </div>

          <div>
            <label
              htmlFor="preference"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Speed vs. Scenery Preference
            </label>
            <input
              type="range"
              id="preference"
              min="0"
              max="100"
              value={speedPreference}
              onChange={(e) => setSpeedPreference(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>More Scenic</span>
              <span>Faster</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Plan Journey
          </button>
        </form>
      </div>
    </div>
  );
}
