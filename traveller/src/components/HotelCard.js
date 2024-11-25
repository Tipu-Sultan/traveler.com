import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StartRating';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate(`/search/hotel/${hotel.hotel_id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
      <img 
        src={hotel.media.photos[0]} 
        alt={hotel.name} 
        className="w-full h-40 sm:h-48 md:h-56 object-cover"
      />
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-1 truncate">{hotel.name}</h4>
        <p className="text-gray-600 text-sm flex justify-between items-center">
          <span className="font-medium text-green-500">₹{hotel.pricing.base_price} / night</span>
          <span className="flex items-center text-yellow-500">
            {hotel.average_rating} <StarRating rating={hotel.average_rating} />
          </span>
        </p>
        <ul className="flex flex-wrap text-xs mt-3 space-x-2">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <li key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {amenity}
            </li>
          ))}
          {hotel.amenities.length > 3 && <li className="text-gray-500">+ more</li>}
        </ul>
        <button 
        onClick={handleKnowMore} 
        className="w-full mt-4 bg-gradient-to-r from-orange-500 to-sky-500 text-white py-2 rounded-lg text-xs font-medium hover:bg-gradient-to-l transition duration-300">
          Know more
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
