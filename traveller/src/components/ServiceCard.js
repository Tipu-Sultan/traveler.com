import React from 'react';
import StarRating from './StartRating';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate(`/search/rental/${service.bike_rental_id}`);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
      <img 
        src={service.media.photos[0]} 
        alt={service.name} 
        className="w-full h-32 sm:h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="text-md font-semibold text-orange-500 truncate">{service.name}</h3>
        <p className="text-gray-400 text-xs">{service.locationName}</p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{service.description}</p>
        <div className="flex justify-between items-center mt-3 text-sm">
          <span className="text-blue-500 font-medium">
            {service.pricing.price_per_day} {service.pricing.currency}/day
          </span>
          <div className="flex items-center text-yellow-500">
            <span className="text-xs mr-1">Ratings: {service.ratings.average_rating}</span>
            <StarRating rating={service.ratings.average_rating} />
          </div>
        </div>
        <button 
        onClick={handleKnowMore} 
        className="w-full mt-4 bg-gradient-to-r from-orange-500 to-sky-500 text-white py-2 rounded-lg text-xs font-medium hover:bg-gradient-to-l transition duration-300">
          Know more 
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
