import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingDetails } from '../redux/slices/bookingSlice';
import { Link, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import DynamicBreadcrumbs from '../components/Breadcrumbs';

const ThankYou = () => {
  const { bookingId } = useParams();
  const { updateBooking } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!updateBooking || Object.keys(updateBooking).length === 0) {
      dispatch(getBookingDetails(bookingId));
    }
  }, [updateBooking, bookingId, dispatch]);

  return (
    <Layout>
      <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <DynamicBreadcrumbs/>
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border border-teal-500">
          <h1 className="text-4xl font-bold text-teal-600 text-center mb-6">
            🎉 Thank You for Booking with Us! 🎉
          </h1>

          {/* Start and End Points */}
          <div className="flex items-center justify-center mb-8 bg-gradient-to-r from-orange-500 to-sky-500 text-white rounded-lg p-4">
            <p className="text-lg font-medium">
              {updateBooking?.startPoint} &nbsp; ➔ &nbsp;
              {updateBooking?.endPoint}
            </p>
          </div>

          {/* Traveler Details */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-lg border-dashed border-2 border-blue-500">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Traveler Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p><span className="font-semibold">Name:</span> {updateBooking?.travelersDetails?.name}</p>
              <p><span className="font-semibold">Email:</span> {updateBooking?.travelersDetails?.email}</p>
              <p><span className="font-semibold">Contact:</span> {updateBooking?.travelersDetails?.contact}</p>
              <p><span className="font-semibold">Gender:</span> {updateBooking?.travelersDetails?.gender}</p>
            </div>
          </div>

          {/* Booking Information as Coupon */}
          <div className="mb-8 p-6 bg-yellow-50 rounded-lg shadow-lg border-dashed border-2 border-yellow-500">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Booking Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p><span className="font-semibold">Booking ID:</span> {updateBooking?.bookingId}</p>
              <p><span className="font-semibold">Booking Date:</span> {new Date(updateBooking?.bookingDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Travel Date:</span> {new Date(updateBooking && updateBooking?.travelDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Number of People:</span> {updateBooking?.numberOfPeople}</p>
              <p><span className="font-semibold">Number of Rooms:</span> {updateBooking?.numberOfRooms}</p>
              <p><span className="font-semibold">Hotel Name:</span> {updateBooking?.hotelName}</p>
              <p><span className="font-semibold">Commute Type:</span> {updateBooking?.commuteType}</p>
            </div>
          </div>

          {/* Payment Details as Coupon */}
          <div className="mb-8 p-6 bg-teal-50 rounded-lg shadow-lg border-dashed border-2 border-teal-500">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p><span className="font-semibold">Payment ID:</span> {updateBooking?.paymentId}</p>
              <p><span className="font-semibold">Payment Status:</span> {updateBooking?.paymentStatus}</p>
              <p><span className="font-semibold">Payment Method:</span> {updateBooking?.paymentMethod}</p>
              <p><span className="font-semibold">Total Cost:</span> ₹{updateBooking?.totalCost}</p>
              <p><span className="font-semibold">Booking Status:</span> {updateBooking?.bookingStatus}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="p-6 bg-teal-100 rounded-lg shadow-inner mt-8 border border-teal-200">
            <h3 className="text-lg font-medium text-teal-600">Package Summary</h3>
            <p className="text-gray-700 mt-2">
              You have successfully booked the <span className="font-semibold text-teal-600">
              <Link to={`/search/place/${updateBooking?.package}`}>See Details of your package</Link>
              </span>. Your booking is <span className="font-semibold text-teal-600">
              {updateBooking?.bookingStatus}</span> and payment has been marked as 
              <span className="font-semibold text-teal-600"> {updateBooking?.paymentStatus}</span>.
              We look forward to making your trip an enjoyable experience!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou;
