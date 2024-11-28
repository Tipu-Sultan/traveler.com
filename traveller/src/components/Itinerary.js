import React, { useState } from 'react';

const Itinerary = ({ itinerary }) => {


  return (
    <div className="">
      <div className="space-y-4">
        {itinerary?.map((day, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-lg`}
          >
            <h3 className="text-xl font-semibold">Day {day.day}</h3>
            <p>{day.activities.join(', ')}</p>
            <p className="italic text-gray-600">{day.highlights}</p>
            <p>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
