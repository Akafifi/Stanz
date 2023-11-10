import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Mapbox styles import (choose your preferred style)
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ longitude, latitude }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJvamVjdHRocmVlIiwiYSI6ImNsb3Fla3JzdDBnM2gyam9ia3VjdGhqZjMifQ.X5EfSfcWlx8Tcg1tm7DjlQ'; // Replace with your Mapbox access token

    // Initialize the map
    const map = new mapboxgl.Map({
      container: 'map-container', // HTML container ID
      style: 'mapbox://styles/mapbox/streets-v11', // choose a map style
      center: [longitude, latitude], // initial map center
      zoom: 12, // initial zoom level
    });

    // Cleanup on component unmount
    return () => map.remove();
  }, [longitude, latitude]);

  return <div id="map-container" style={{ height: '400px', width: '100%' }} />;
};

export default Map;
