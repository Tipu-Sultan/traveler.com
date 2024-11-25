import React from 'react';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookingDetailsModal = ({ booking, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white max-w-lg w-full p-6 rounded-lg relative shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
      >
        <FaTimes size={24} />
      </button>

      {/* Header Section with Start and End Points */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center space-x-2">
          <FaMapMarkerAlt className="text-blue-500" />
          <span className="text-lg font-semibold text-gray-700">
            {booking.startPoint} ➔ {booking.endPoint}
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">{booking.package}</h2>
      </div>

      {/* Date and Payment Details */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-blue-500" />
          <span>From: {new Date(booking.travelDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-blue-500" />
          <span>To: {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaMoneyBillWave className="text-green-500" />
          <span>Total Cost: ₹{booking.payment.amount}</span>
        </div>
      </div>

      {/* Coupon-Like Summary Card */}
      <div className="bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg p-4 mt-6">
        <h4 className="text-center text-lg font-semibold mb-2">Booking Summary</h4>
        <div className="flex justify-between">
          <span>Booking ID:</span>
          <span>{booking.bookingId}</span>
        </div>
        <div className="flex justify-between">
          <span>Status:</span>
          <span>{booking.bookingStatus}</span>
        </div>
        <div className="flex justify-between">
          <span>Payment Id:</span>
          <span>{booking.payment.paymentId}</span>
        </div>
        <div className="flex justify-between">
          <span>Payment Method:</span>
          <span>{booking.payment.method}</span>
        </div>
      </div>

      {/* Close Button */}
      <div className="mt-4 text-center">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-sky-500 text-white rounded hover:bg-gradient-to-l transition duration-300"
        >
          Close
        </button>

        <Link
          className="m-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-sky-500 text-white rounded hover:bg-gradient-to-l transition duration-300"
          to={`/booking/thank-you/${booking.bookingId}`} >
          View Package Details
        </Link>
      </div>
    </div>
  </div>
);

export default BookingDetailsModal;
