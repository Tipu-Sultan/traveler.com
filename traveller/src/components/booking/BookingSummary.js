const BookingSummary = ({ bookingDetails, hotel, checkoutPrice,finalPlace}) => (
  <div className="bg-sky-100 p-6 lg:col-span-1 border-r border-sky-200 flex flex-col justify-between">
    <h2 className="text-2xl font-semibold text-sky-600 mb-4">Booking Summary</h2>
    <div className="space-y-2 text-gray-700">
    <p><span className="font-medium">From:</span> {bookingDetails.startPoint} <span className="font-medium">To:</span> {bookingDetails.endPoint} </p>
      <p><span className="font-medium">Trip Date:</span> {bookingDetails.travelDate}</p>
      <p><span className="font-medium">Package:</span> {bookingDetails?.packageName}</p>
      <p><span className="font-medium">Hotel:</span> {bookingDetails.hotelName}</p>
      <p><span className="font-medium">Commute:</span> {bookingDetails.commuteType}</p>
      <p><span className="font-medium">Travelers:</span> {bookingDetails.travelers}</p>
      <p><span className="font-medium">Extra Rooms:</span> {bookingDetails.extraRooms}</p>
      <p><span className="font-medium">Total Price:</span> ₹{bookingDetails.checkoutPrice}</p>
    </div>
    <img
      src={'https://travelercom.vercel.app/static/media/logo.10af85ce2e3989e8d87e.jpg'}
      alt="Booking"
      className="mt-6 rounded-lg w-64 mx-auto mb-4"
    />
  </div>
);

export default BookingSummary;
