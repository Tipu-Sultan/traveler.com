import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';

const DestinationPage = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [endingPoint, setEndingPoint] = useState('');
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '5b3ce3597851110001cf62488fda58b52e584c2b816d3f67d5641ef7';  // Replace with your ORS API key

  const fetchCoordinates = async (location) => {
    try {
      const response = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
        headers: {
          'Authorization': apiKey
        },
        params: {
          text: location
        }
      });
      const { features } = response.data;
      return features.length > 0 ? features[0].geometry.coordinates : null;
    } catch (error) {
      console.error(`Error fetching coordinates for ${location}:`, error);
      return null;
    }
  };

  const handleCalculateRoute = async () => {
    setError('');
    setRouteInfo(null);

    if (!startingPoint || !endingPoint) {
      setError('Please enter both starting and ending points.');
      return;
    }

    setLoading(true);

    try {
      const startCoords = await fetchCoordinates(startingPoint);
      const endCoords = await fetchCoordinates(endingPoint);

      if (!startCoords || !endCoords) {
        setError('Could not retrieve coordinates for the provided locations.');
        return;
      }

      // Fetch the route details
      const routeResponse = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car/geojson`, {
        headers: {
          'Authorization': apiKey
        },
        params: {
          coordinates: [startCoords, endCoords]
        }
      });

      const { features } = routeResponse.data;
      const { distance, segments } = features[0].properties.summary;
      const path = features[0].geometry.coordinates.map((coord) => {
        return `${coord[1].toFixed(5)},${coord[0].toFixed(5)}`;  // Format as lat, long
      });

      setRouteInfo({
        distance: (distance / 1000).toFixed(2),  // Convert meters to kilometers
        path
      });
    } catch (err) {
      setError('Failed to fetch route information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Find Your Route</h1>

      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Starting Point"
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm w-full md:w-1/3"
        />

        <input
          type="text"
          placeholder="Ending Point"
          value={endingPoint}
          onChange={(e) => setEndingPoint(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm w-full md:w-1/3"
        />

        <button
          onClick={handleCalculateRoute}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Calculate Route
        </button>
      </div>

      {loading && <p className="text-center mt-4">Calculating route...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {routeInfo && (
        <div className="mt-6 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-semibold">Route Details</h2>

          <div className="mt-4">
            <p className="font-medium">Starting Point: <span className="text-gray-700">{startingPoint}</span></p>
            <p className="font-medium">Ending Point: <span className="text-gray-700">{endingPoint}</span></p>
            <p className="font-medium">Total Distance: <span className="text-gray-700">{routeInfo.distance} km</span></p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Path:</h3>
            <div className="mt-2 bg-gray-100 p-2 rounded">
              {routeInfo.path.map((location, index) => (
                <span key={index} className="text-gray-800">
                  {location}
                  {index < routeInfo.path.length - 1 && <span className="text-blue-500"> &rarr; </span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default DestinationPage;
