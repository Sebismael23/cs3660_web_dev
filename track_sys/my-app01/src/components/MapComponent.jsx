// src/components/MapComponent.jsx
import React from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

// Set map container size
const containerStyle = {
  width: '100%',
  height: '400px',
};


const center = {
  lat: 40.2969, // Default latitude (Orem)
  lng: -111.6946, // Default longitude (Orem)
};

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const assets = [
  { id: 1, name: "Delivery Van 1", type: "van", lat: 40.6944, lng: -111.2964 },
  { id: 2, name: "Medical Drone", type: "drone", lat: 40.6945, lng: -111.2963 },
  { id: 3, name: "Company Car", type: "car", lat: 40.6942, lng: -111.29677 },
];

// Custom icons for different asset types
const assetIcons = {
  car: "https://maps.google.com/mapfiles/kml/shapes/cabs.png",
  van: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
  drone: "https://maps.google.com/mapfiles/kml/shapes/heliport.png",
};

const MapComponent = () => {
  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyDELJ0xzPeOeO2kx9FYzLFd_VdpojdjcJE">
      <div
            className='tw-bg-gray-400 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg  tw-rounded-xl tw-p-6 tw-border tw-border-gray-700'
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{ styles: mapStyles }}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </LoadScriptNext>
  );
};

export default MapComponent;
