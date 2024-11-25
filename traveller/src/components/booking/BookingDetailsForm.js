import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useBookingForm from '../../hooks/useBookingForm';

const BookingDetailsForm = ({ bookingDetails,hotel }) => {
  const {
    travelDate,
    travelers,
    extraRooms,
    commuteType,
    hotelName,
    setTravelers,
    setExtraRooms,
    setCommuteType,
    setHotelName,
    handleDateChange,
  } = useBookingForm(bookingDetails);

  const handleTravelersChange = (action) => {
    if (action === 'increment') {
      setTravelers((prev) => prev + 1);
    } else if (action === 'decrement' && travelers > 1) {
      setTravelers((prev) => prev - 1);
    }
  };

  const handleRoomsChange = (action) => {
    if (action === 'increment') {
      setExtraRooms((prev) => prev + 1);
    } else if (action === 'decrement' && extraRooms > 0) {
      setExtraRooms((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-sky-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-orange-500 mb-5">Booking Details</h2>

      {/* Grid layout with two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar Column */}
        <div className="text-gray-700">
          <span>Select Travel Date:</span>
          <Calendar
            onChange={handleDateChange} 
            value={travelDate}
            className="mt-3 border border-gray-300 rounded-md w-full md:max-w-md" // Medium-sized calendar
          />
        </div>

        {/* Controls Column */}
        <div className="flex flex-col space-y-5">
          {/* Travelers */}
          <div>
            <span className="text-gray-700">Number of Travelers:</span>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => handleTravelersChange('decrement')}
                className="bg-sky-300 text-xl px-3 py-1 rounded-md hover:bg-gray-400"
              >
                -
              </button>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(Math.max(1, e.target.value))}
                min="1"
                className="w-16 text-center border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleTravelersChange('increment')}
                className="bg-orange-300 text-xl px-3 py-1 rounded-md hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>

          {/* Extra Rooms */}
          <div>
            <span className="text-gray-700">Extra Rooms:</span>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => handleRoomsChange('decrement')}
                className="bg-sky-300 text-xl px-3 py-1 rounded-md hover:bg-gray-400"
              >
                -
              </button>
              <input
                type="number"
                value={extraRooms}
                onChange={(e) => setExtraRooms(Math.max(0, e.target.value))}
                min="0"
                className="w-16 text-center border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleRoomsChange('increment')}
                className="bg-orange-300 text-xl px-3 py-1 rounded-md hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>

          {/* Commute Type */}
          <div>
            <span className="text-gray-700">Commute Type:</span>
            <select
              value={commuteType || bookingDetails.commuteType}
              onChange={(e) => setCommuteType(e.target.value)}
              className="mt-3 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="flight">Flight</option>
              <option value="on your own">Own Transport</option>
            </select>
          </div>

          {/* Hotel Name */}
          <div>
            <span className="text-gray-700">Hotel Name:</span>
            <input
              type="text"
              value={hotelName || hotel}
              onChange={(e) => setHotelName(e.target.value)}
              required
              className="mt-3 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsForm;
