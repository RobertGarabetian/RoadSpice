// Map.tsx
import { useEffect, useRef, useState } from "react";
import { ResponseData, Stop } from "./types";
declare global {
  interface Window {
    initMap?: () => void; // TypeScript workaround for attaching initMap to the window
    google: any;
  }
}
interface MapProps {
  locationInfo: ResponseData | null;
}
//
// function formatCity(cityName: string) {
//   const formattedCity = cityName.trim().replace(" ", "+");
//   console.log(formattedCity);
//   return formattedCity;
// }
function formatCity(cityName: string) {
  const formattedCity = cityName.trim().replace(/\s+/g, "+");
  return formattedCity;
}

const Map: React.FC<MapProps> = ({ locationInfo }) => {
  const mapRef = useRef<HTMLDivElement>(null); // Reference to the map container
  const apiKEY = import.meta.env.VITE_GOOGLE_MAPS_API; // API Key from environment variables
  const [selectedWaypoints, setSelectedWaypoints] = useState<string[]>([]);

  useEffect(() => {
    console.log("Entered useEffect in Map.tsx");

    // Check if the Google Maps script is already added to avoid duplicates
    if (!document.querySelector("#google-maps-script")) {
      console.log("Trying to connect to the Maps API...");

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKEY}&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Attach the initMap function to the window object
      window.initMap = () => {
        console.log("Initializing map...");
        if (mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 36.7783, lng: -119.4179 }, // Centered on California
            zoom: 6,
          });

          // Call loadDirections to plot directions between two cities
          loadDirections(
            map,
            `${locationInfo?.start.name}, ${locationInfo?.start.state}`,
            `${locationInfo?.finish.name}, ${locationInfo?.finish.state}`
          );
        }
      };

      script.onload = () => console.log("Google Maps script loaded!");
      script.onerror = (error) =>
        console.error("Google Maps script failed to load:", error);

      document.head.appendChild(script);
    } else {
      console.log(
        "Google Maps script already exists, initializing map directly..."
      );
      // If the script already exists, initialize the map directly
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 36.7783, lng: -119.4179 },
          zoom: 6,
        });

        console.log(locationInfo?.start.name);
        console.log(locationInfo?.finish.name);
        // Call loadDirections to plot directions
        if (locationInfo?.start && locationInfo.finish && locationInfo.stops) {
          loadDirections(
            map,
            formatCity(
              `${locationInfo.start.name}, ${locationInfo.start.state}`
            ),
            formatCity(
              `${locationInfo.finish.name}, ${locationInfo.finish.state}`
            ),
            locationInfo.stops
          );
        }
        // loadDirections(map, "Los+Angeles", "San+Francisco");
      }
    }
  }, [locationInfo]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

// Function to load directions using DirectionsService and DirectionsRenderer

function loadDirections(
  map: any,
  origin: string,
  destination: string,
  stops: Stop[] = []
) {
  const directionsService = new window.google.maps.DirectionsService();
  const directionsRenderer = new window.google.maps.DirectionsRenderer();

  // Attach the renderer to the map
  directionsRenderer.setMap(map);

  const waypts: google.maps.DirectionsWaypoint[] = stops.map((stop) => ({
    location: `${stop.name}, ${stop.state}`, // Include state for specificity
    stopover: true,
  }));

  // Request directions between the origin and destination
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (
      result: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus
    ) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        console.error(`Directions request failed: ${status}`);
      }
    }
  );
}

export { Map };
