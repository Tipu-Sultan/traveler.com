// ConfirmationPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ConfirmationPage = () => {
  const { packageId } = useParams();
  const { bookingDetails } = useSelector((state) => state.booking);

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmation</h1>
      <p>Thank you for your booking!</p>
      <h3>Booking Details</h3>
      <p>Package: {packageId}</p>
      <p>Hotel: {bookingDetails.hotelName}</p>
      <p>Commute: {bookingDetails.commuteType}</p>
      <p>Travelers: {bookingDetails.travelers}</p>
      <p>Extra Rooms: {bookingDetails.extraRooms}</p>
      <p>Total Price: ${bookingDetails.packagePrice}</p>
    </div>
  );
};

export default ConfirmationPage;
