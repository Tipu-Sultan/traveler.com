import React from 'react';
import HotelCard from './HotelCard';

const HotelsList = ({ hotels }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-blue-600">Recommended Hotels</h3>
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelsList;
