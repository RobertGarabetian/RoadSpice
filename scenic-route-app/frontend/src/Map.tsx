import { useEffect, useRef } from "react";
import { ResponseData, Stop } from "./types";

declare global {
  interface Window {
    initMap?: () => void; // TypeScript workaround for attaching initMap to the window
    google: any;
  }
}

interface MapProps {
  locationInfo: ResponseData | null;
  onError: (errorMessage: string) => void; // Add onError prop
}

function formatCity(cityName: string) {
  const formattedCity = cityName.trim().replace(/\s+/g, "+");
  return formattedCity;
}

const Map: React.FC<MapProps> = ({ locationInfo, onError }) => {
  const mapRef = useRef<HTMLDivElement>(null); // Reference to the map container
  const apiKEY = import.meta.env.VITE_GOOGLE_MAPS_API; // API Key from environment variables

  // Function to initialize the map
  const initializeMap = () => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 36.7783, lng: -119.4179 }, // Centered on California
        zoom: 6,
      });

      console.log("Map initialized without directions");

      // Plot directions if locationInfo is available
      if (locationInfo?.start && locationInfo.finish) {
        console.log("Location info available, plotting directions...");
        loadDirections(
          map,
          formatCity(`${locationInfo.start.name}, ${locationInfo.start.state}`),
          formatCity(`${locationInfo.finish.name}, ${locationInfo.finish.state}`),
          locationInfo.stops || [],
          onError
        );
      } else {
        console.log("No valid location info, displaying blank map.");
      }
    }
  };

  // Function to load Google Maps script only once
  const loadGoogleMapsScript = async () => {
    if (!window.google) {
      console.log("Trying to connect to the Maps API...");

      const script = await document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKEY}&callback=initMap`;
      script.async = true;
      script.defer = true;

      window.initMap = initializeMap;
      script.onerror = (error) =>
        console.error("Google Maps script failed to load:", error);

      document.head.appendChild(script);
    } else {
      console.log("Google Maps script already loaded.");
      initializeMap();
    }
  };

  // Load the Google Maps script on initial render only
  useEffect(() => {
    loadGoogleMapsScript();
  }, []); // Empty dependency array to ensure it runs once on mount

  // Re-render the map when locationInfo changes
  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 36.7783, lng: -119.4179 }, // Centered on California
        zoom: 6,
      });

      if (locationInfo?.start && locationInfo.finish) {
        loadDirections(
          map,
          formatCity(`${locationInfo.start.name}, ${locationInfo.start.state}`),
          formatCity(`${locationInfo.finish.name}, ${locationInfo.finish.state}`),
          locationInfo.stops || [],
          onError
        );
      }
    }
  }, [locationInfo]); // This runs when locationInfo changes

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

// Function to load directions using DirectionsService and DirectionsRenderer
function loadDirections(
  map: any,
  origin: string,
  destination: string,
  stops: Stop[] = [],
  onError: any
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
      } else if (status === "NOT_FOUND") {
        console.log("Error caught: Locations not found");
        onError(
          "Locations were not found: please make sure their names were spelled correctly and exist."
        );
      } else if (status === "ZERO_RESULTS") {
        console.log("Error caught: No route found");
        onError("Route not found: this route is not possible.");
      } else {
        const errorMessage = `Directions request failed: ${status}`;
        console.error(errorMessage);
        onError(
          "Sorry! There seemed to be an unknown issue with your request. Please try again."
        );
      }
    }
  );
}

export { Map };
