// src/maps.js

let map;

function formatCityName(city) {
  return city.trim().replace(/[\s_]+/g, '+');
}

function createURL(cityA, cityB) {
  const endpoint = 'https://maps.googleapis.com/maps/api/directions/json';
  return `${endpoint}?origin=${formatCityName(cityA)}&destination=${formatCityName(cityB)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`; // Vite's way to access env variables
}

export async function getShortestRoute(cityA, cityB) {
  const url = createURL(cityA, cityB);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.status === 'OK') {
      const route = data.routes[0];
      return route;
    } else {
      console.error('Error:', data.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export function loadGoogleMapsScript(apiKey, callback) {
  const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);

  if (existingScript) {
    if (callback) window[callback]();
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callback}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export function initializeMap(mapRef, center = { lat: 34.0522, lng: -118.2437 }) {
  map = new window.google.maps.Map(mapRef.current, {
    center,
    zoom: 7,
  });
}
