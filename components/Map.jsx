// components/MapComponent.js
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  useEffect(() => {
    // Check if the map has already been initialized
    const mapContainer = document.getElementById("map");
    if (mapContainer._leaflet_id) {
      return; // If the map is already initialized, return
    }

    // Initialize the map
    const map = L.map("map").setView([41.9102088, 12.3711917, 11], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Cleanup on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "800px", width: "100%" }}></div>;
};

export default MapComponent;
