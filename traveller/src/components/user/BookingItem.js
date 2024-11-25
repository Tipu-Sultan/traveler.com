import React from 'react';

const BookingItem = ({ data, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
  >
    <h4 className="text-lg font-semibold text-gray-800">{data.package}</h4>
    <p className="text-sm text-gray-600">Booking ID: {data.bookingId}</p>
    <p className={`text-sm ${data.bookingStatus === 'Confirmed' ? 'text-green-500' : 'text-red-500'}`}>
      {data.bookingStatus}
    </p>
  </div>
);

export default BookingItem;
