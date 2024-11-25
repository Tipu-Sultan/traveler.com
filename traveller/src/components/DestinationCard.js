// components/DestinationCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StartRating';
import { FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const DestinationCard = ({ destination }) => {
  const {bookingDetails} = useSelector(state => state.booking)
  return (
    <Link to={`/search/place/${destination.place_id}`} >
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-transform transform hover:scale-55 hover:shadow-2xl duration-300 ease-in-out  relative">
        <img
          src={destination.media.photos[0]}
          alt={destination.name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
        {/* Duration Badge positioned in the top corner */}
        <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
          {destination.duration.days}d/{destination.duration.nights}n
        </span>
        <div className="p-4">
          <p className="text-gray-800 font-semibold">Price: ₹{destination.packagePricing.finalPrice} /
            <span
              className="px-2 py-1 bg-blue-200 text-blue-700 rounded-full text-xs md:text-xs shadow-md hover:bg-blue-300 transition duration-300"
            >
              Per Person
            </span>
          </p>
          <hr class="my-4 h-1 bg-gradient-to-r from-pink-500 to-orange-500 border-0 rounded-full" />

          <h2 className="text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors duration-300">
            {destination.name}
          </h2>
          <p className="text-gray-700 mt-1">{destination.description.short}</p>

          {/* Display crucial details in a compact manner */}
          <div className="mt-2">
            <p className="text-gray-800  flex items-center">
              Overall Rating: {destination.ratings.overall} &nbsp; <StarRating rating={destination.ratings.overall} />
            </p>
            <p className="text-gray-600">Amenities: {destination.amenities.join(', ')}</p>
          </div>

          {/* Display tags */}
          <div className="mt-2 flex flex-wrap space-x-1">
            {destination.tags?.slice(0, 4).map((tag, index) => ( // Change 4 to display the top 4 tags
              <span
                key={index}
                className="px-2 py-1 bg-blue-200 text-blue-700 rounded-full text-xs md:text-xs shadow-md hover:bg-blue-300 transition duration-300"
              >
                {tag}
              </span>
            ))}
          </div>



          <div className="mt-4 flex space-x-2">
            <Link
              to={`/search/place/${destination.packageId}`}
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-sky-500 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-300"
            >
              <FaInfoCircle className="mr-2" />
              See Details
            </Link>

            <Link
              to={!(bookingDetails.startPoint && bookingDetails.endPoint && bookingDetails.travelDate)? `/booking?packageId=${destination.packageId}`: `/booking?start=${bookingDetails?.startPoint}&end=${bookingDetails.endPoint}&date=${bookingDetails.travelDate}&travelers=${bookingDetails.travelers}&packageId=${destination.packageId}`} // Redirect to the booking page
              className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
