// components/TripCalculator.js
import React, { useState } from 'react';
import Layout from '../layout/Layout';

const TripCalculator = () => {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelCost, setFuelCost] = useState('');
  const [foodCost, setFoodCost] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [hotelCost, setHotelCost] = useState('');
  const [rentalCost, setRentalCost] = useState('');
  const [totalCost, setTotalCost] = useState(null);

  const calculateCost = (e) => {
    e.preventDefault();

    const distanceValue = parseFloat(distance);
    const fuelEfficiencyValue = parseFloat(fuelEfficiency);
    const fuelCostValue = parseFloat(fuelCost);
    const foodCostValue = parseFloat(foodCost);
    const purchaseCostValue = parseFloat(purchaseCost);
    const hotelCostValue = parseFloat(hotelCost);
    const rentalCostValue = parseFloat(rentalCost);

    if (
      distanceValue > 0 &&
      fuelEfficiencyValue > 0 &&
      fuelCostValue >= 0 &&
      foodCostValue >= 0 &&
      purchaseCostValue >= 0 &&
      hotelCostValue >= 0 &&
      rentalCostValue >= 0
    ) {
      const totalFuelNeeded = distanceValue / fuelEfficiencyValue;
      const totalFuelCost = totalFuelNeeded * fuelCostValue;

      const totalTripCost =
        totalFuelCost +
        foodCostValue +
        purchaseCostValue +
        hotelCostValue +
        rentalCostValue;

      setTotalCost(totalTripCost);
    } else {
      setTotalCost(null);
    }
  };

  return (
    <Layout>
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-orange-500">Trip Cost Calculator</h1>
      <form onSubmit={calculateCost} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700">Distance (km):</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter distance in kilometers"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Fuel Efficiency (km/l):</label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter fuel efficiency"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Fuel Cost per Liter:</label>
          <input
            type="number"
            value={fuelCost}
            onChange={(e) => setFuelCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter fuel cost"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Food Cost:</label>
          <input
            type="number"
            value={foodCost}
            onChange={(e) => setFoodCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter total food cost"
          />
        </div>
        <div>
          <label className="block text-gray-700">Purchases Cost:</label>
          <input
            type="number"
            value={purchaseCost}
            onChange={(e) => setPurchaseCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter purchases cost"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hotel Cost:</label>
          <input
            type="number"
            value={hotelCost}
            onChange={(e) => setHotelCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter hotel cost"
          />
        </div>
        <div>
          <label className="block text-gray-700">Rental or Cab Cost:</label>
          <input
            type="number"
            value={rentalCost}
            onChange={(e) => setRentalCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter rental or cab cost"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gradient-to-r from-orange-500 to-sky-500 text-white rounded hover:bg-orange-600 transition"
        >
          Calculate Total Cost
        </button>
      </form>

      {totalCost !== null && (
        <div className="mt-6 p-4 bg-blue-100 rounded border border-blue-300 text-blue-800">
          <h2 className="text-lg font-semibold">Total Trip Cost:</h2>
          <p className="text-xl">{totalCost.toFixed(2)} Currency</p>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default TripCalculator;
