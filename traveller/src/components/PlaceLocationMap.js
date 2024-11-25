import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const PlaceLocationMap = ({ latitude, longitude }) => {
    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };

    const center = {
        lat: latitude,
        lng: longitude,
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15} // Adjust zoom level as needed
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default PlaceLocationMap;
