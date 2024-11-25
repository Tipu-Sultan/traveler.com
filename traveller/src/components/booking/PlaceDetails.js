import React from 'react';

const PlaceDetails = ({ place }) => (
  <div className="mt-4 space-y-4">
    {/* Itinerary Section */}
    <h4 className="text-xl font-semibold">Itinerary</h4>
    {place?.itinerary?.map((day, index) => (
      <div key={index} className="mt-2">
        <h5 className="font-semibold">Day {day.day}</h5>
        <p>{day.activities.join(', ')}</p>
        <p className="italic text-gray-600">{day.highlights}</p>
      </div>
    ))}

    {/* Additional Details Section */}
    <div className="space-y-2">
      {/* Location */}
      {place?.location && (
        <div>
          <h5 className="font-semibold">Location:</h5>
          <p>{place.location}</p>
        </div>
      )}

      {/* Category */}
      {place?.category && (
        <div>
          <h5 className="font-semibold">Category:</h5>
          <p>{place.category}</p>
        </div>
      )}

      {/* Best Time to Visit */}
      {place?.bestTimeToVisit && (
        <div>
          <h5 className="font-semibold">Best Time to Visit:</h5>
          <p>{place.bestTimeToVisit.season}</p>
          <p>{place.bestTimeToVisit.months.join(', ')}</p>

        </div>
      )}

      {/* Entry Fee */}
      {place?.entryFee && (
        <div>
          <h5 className="font-semibold">Entry Fee:</h5>
          <p>₹{place.entryFee}</p>
        </div>
      )}

      {/* Tags */}
      {place?.tags && (
        <div>
          <h5 className="font-semibold">Tags:</h5>
          <p>{place.tags.join(', ')}</p>
        </div>
      )}

      {/* Rating */}
      {place?.rating && (
        <div>
          <h5 className="font-semibold">Rating:</h5>
          <p>{place.rating} / 5</p>
        </div>
      )}

      {/* Amenities */}
      {place?.amenities && (
        <div>
          <h5 className="font-semibold">Amenities:</h5>
          <p>{place.amenities.join(', ')}</p>
        </div>
      )}

      {/* Opening Hours */}
      {place?.openingHours && (
        <div>
          <h5 className="font-semibold">Opening Hours:</h5>
          <p>{place.openingHours}</p>
        </div>
      )}

      {/* Activities */}
      {place?.activities && (
        <div>
          <h5 className="font-semibold">Activities:</h5>
          <p>{place.activities.join(', ')}</p>
        </div>
      )}
    </div>
  </div>
);

export default PlaceDetails;
