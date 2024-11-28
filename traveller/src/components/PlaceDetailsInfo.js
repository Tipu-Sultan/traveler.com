import React from 'react';
import Itinerary from './Itinerary';

const PlaceDetailsInfo = ({ place }) => {

    return (
        <div className="h-screen overflow-y-scroll ">

            {/* Itinerary Section */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Itinerary</h3>
                <Itinerary itinerary={place.itinerary} />
            </section>


            <section className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Important Details</h3>
                {/* Display your important details here */}
                <p><strong>Location:</strong> {place.locations?.city}, {place.locations?.state}</p>
                <p><strong>Pricing:</strong> ${place.packagePricing?.basePrice}</p>
                <p><strong>Cancellation Policy:</strong> {place.cancellationPolicy?.refundPercentage}% refund</p>
            </section>

            <section className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Package Details</h3>
                <p>{place.description?.overview}</p>
                <p><strong>Duration:</strong> {place.duration?.days} Days / {place.duration?.nights} Nights</p>
                <p><strong>Category:</strong> {place.category}</p>
            </section>

        </div>
    );
};

export default PlaceDetailsInfo;
