import React from 'react';

const PlaceSummary = ({ place }) => (
  <div className="mt-4 space-y-8">
    {/* Place Overview */}
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold">{place?.name}</h2>
      <p className="text-lg italic text-gray-600">{place?.description?.short}</p>
    </div>

    {/* Itinerary Section */}
    <div>
      <h4 className="text-xl font-semibold">Itinerary</h4>
      {place?.itinerary?.map((day, index) => (
        <div key={index} className="mt-4">
          <h5 className="font-semibold text-lg">Day {day?.day}</h5>
          <p className="text-gray-700">{day?.activities?.join(', ')}</p>
          <p className="italic text-gray-600">{day?.highlights}</p>
        </div>
      ))}
    </div>

    {/* Additional Details Section */}
    <div className="space-y-6">
      {/* Location */}
      {place?.locations && (
        <div className="space-y-2">
          <h5 className="font-semibold">Location:</h5>
          <p>{place?.locations?.village ? `${place?.locations?.village}, ` : ''}{place?.locations?.city}, {place?.locations?.state}, {place?.locations?.country}</p>
          <p>Coordinates: {place?.locations?.coordinates?.latitude}, {place?.locations?.coordinates?.longitude}</p>
        </div>
      )}

      {/* Category */}
      {place?.category && (
        <div className="space-y-2">
          <h5 className="font-semibold">Category:</h5>
          <p>{place?.category}</p>
        </div>
      )}

      {/* Best Time to Visit */}
      {place?.bestTimeToVisit && (
        <div className="space-y-2">
          <h5 className="font-semibold">Best Time to Visit:</h5>
          <p>{place?.bestTimeToVisit?.season}</p>
          <p>{place?.bestTimeToVisit?.months?.join(', ')}</p>
        </div>
      )}

      {/* Entry Fee */}
      {place?.entryFee && (
        <div className="space-y-2">
          <h5 className="font-semibold">Entry Fee:</h5>
          <p>₹{place?.entryFee}</p>
        </div>
      )}

      {/* Tags */}
      {place?.tags && (
        <div className="space-y-2">
          <h5 className="font-semibold">Tags:</h5>
          <p>{place?.tags?.join(', ')}</p>
        </div>
      )}

      {/* Rating */}
      {place?.ratings?.overall && (
        <div className="space-y-2">
          <h5 className="font-semibold">Rating:</h5>
          <p>{place?.ratings?.overall} / 5</p>
          <div className="space-x-2">
            {Object.entries(place?.ratings?.categories || {}).map(([category, rating]) => (
              <p key={category} className="text-sm">
                {category}: {rating} / 5
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {place?.amenities && (
        <div className="space-y-2">
          <h5 className="font-semibold">Amenities:</h5>
          <p>{place?.amenities?.join(', ')}</p>
        </div>
      )}

      {/* Activities */}
      {place?.activities && (
        <div className="space-y-2">
          <h5 className="font-semibold">Activities:</h5>
          <p>{place?.activities?.join(', ')}</p>
        </div>
      )}

      {/* Nearby Hotels */}
      {place?.nearbyHotels && (
        <div className="space-y-2">
          <h5 className="font-semibold">Nearby Hotels:</h5>
          {place?.nearbyHotels?.map((hotel, index) => (
            <div key={index} className="border-t pt-2">
              <p className="font-semibold">{hotel?.name}</p>
              <p>{hotel?.rating} / 5 - ₹{hotel?.pricePerNight} per night</p>
            </div>
          ))}
        </div>
      )}

      {/* Package Pricing */}
      {place?.packagePricing && (
        <div className="space-y-2">
          <h5 className="font-semibold">Package Pricing:</h5>
          <p>Base Price: ₹{place?.packagePricing?.basePrice}</p>
          <p>Additional Fees: ₹{place?.packagePricing?.additionalFees}</p>
          <p>Discount: {place?.packagePricing?.discount}%</p>
          <p><span className="font-bold">Final Price: ₹{place?.packagePricing?.finalPrice}</span></p>
        </div>
      )}
    </div>
  </div>
);

export default PlaceSummary;
