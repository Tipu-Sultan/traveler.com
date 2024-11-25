import React, { useState } from 'react';
import BookingItem from './BookingItem';
import BookingDetailsModal from './BookingDetailsModal';

const BookingList = ({ confirmedData }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const openModal = (booking) => setSelectedBooking(booking);
  const closeModal = () => setSelectedBooking(null);

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-gray-800">Your Confirmed Bookings</h3>
      {confirmedData?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {confirmedData.map((data) => (
            <BookingItem key={data.bookingId} data={data} onClick={() => openModal(data)} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">You have no confirmed bookings.</p>
      )}
      {selectedBooking && (
        <BookingDetailsModal booking={selectedBooking} onClose={closeModal} />
      )}
    </div>
  );
};

export default BookingList;
