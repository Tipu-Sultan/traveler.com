import React from 'react';
import { useParams } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import ServiceCard from '../components/ServiceCard';
import Layout from '../layout/Layout';
import Carousel from '../components/Carousel';
import DynamicBreadcrumbs from '../components/Breadcrumbs';
import StarRating from '../components/StartRating';
import Spinner from '../components/Spinner';
import Error from '../layout/Error';
import usePackageData from '../hooks/usePackageData';

const PlaceDetails = () => {
  const { packageId } = useParams();
  const {finalPlace,nearbyHotels,bikesorCar,petrolStations, loading, error } = usePackageData(packageId);


  return (
    <Layout title="Place Details | Traveller.com" description="Explore the best destinations with Traveller.com">
      <div className="container mx-auto max-w-7xl px-6 py-10">
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <Spinner size="large" color="blue-500" />
          </div>
        )}
  
        {error ? (
          <div className="flex justify-center items-center h-screen">
            <Error error={error} />
          </div>
        ) : (
          !loading && (
            <>
              <DynamicBreadcrumbs className="mb-8 text-blue-600 text-sm" />
  
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side: Suggested Hotels */}
                <div className="lg:w-1/4 p-4 bg-white shadow-lg rounded-lg space-y-5">
                  <h3 className="text-xl font-semibold text-blue-600">Recommended Hotels</h3>
                  {nearbyHotels.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                  ))}
                </div>
  
                {/* Center: Place Details */}
                <div className="w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg">
                  <h6 className="text-1xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                    <span>{finalPlace?.name}</span>
                    {finalPlace.locations?.state && (
                      <>
                        <span className="text-gray-400">{'>'}</span>
                        <span>{finalPlace?.locations?.state}</span>
                      </>
                    )}
                    {finalPlace.locations?.country && (
                      <>
                        <span className="text-gray-400">{'>'}</span>
                        <span>{finalPlace?.locations?.country}</span>
                      </>
                    )}
                  </h6>
  
                  <Carousel images={finalPlace.media?.photos} className="mb-4 rounded-lg shadow-md" />
                  <p className="text-lg font-medium text-indigo-700 mb-6">{finalPlace?.description?.short}</p>
                  
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Location:</strong> {finalPlace?.locations?.city}, {finalPlace.locations?.state}, {finalPlace.locations?.country}</p>
                    <p><strong>Category:</strong> {finalPlace?.category}</p>
                    <p><strong>Best Time to Visit:</strong> {finalPlace?.best_time_to_visit?.season} ({finalPlace?.best_time_to_visit?.months?.join(', ')})</p>
                    <p><strong>Entry Fee:</strong> ₹{finalPlace?.entry_fee}</p>
                    <p><strong>Tags:</strong> {finalPlace?.tags?.join(', ')}</p>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center mb-3">
                      <span className="font-semibold text-md mr-2">Rating:</span>
                      <StarRating rating={finalPlace.ratings?.overall} />
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="font-semibold text-md mr-2">Amenities:</span>
                      <p>{finalPlace?.amenities?.join(', ')}</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="font-semibold text-md mr-2">Opening Hours:</span>
                      <p>{finalPlace?.opening_hours?.Monday}</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="font-semibold text-md mr-2">Activities:</span>
                      <p>{finalPlace?.activities?.join(', ')}</p>
                    </div>
                  </div>
                </div>
  
                {/* Right Side: Nearby Rentals & Services */}
                <div className="lg:w-1/4 p-4 bg-white shadow-lg rounded-lg space-y-5">
                  <h3 className="text-xl font-semibold text-blue-600">Nearby Rentals & Services</h3>
                  {[...bikesorCar, ...petrolStations].map((service, index) => (
                    <ServiceCard key={index} service={service} />
                  ))}
                </div>
              </div>
  
              {/* Package Details Section */}
              <div className="mt-12 p-8 bg-white border rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold text-green-700 mb-4">Adventure Package</h3>
                <p className="text-gray-700 mb-6">{finalPlace.description?.detailed}</p>
                <div>
                  <h4 className="text-2xl font-semibold mb-3">Itinerary</h4>
                  {finalPlace?.itinerary?.map((day, index) => (
                    <div key={index} className="mt-2 bg-gray-50 p-4 rounded-lg shadow-sm">
                      <h5 className="font-semibold text-lg">Day {day.day}</h5>
                      <p className="text-gray-600">{day.activities.join(', ')}</p>
                      <p className="italic text-gray-500">{day.highlights}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="text-2xl font-semibold mb-2">Pricing</h4>
                  <p>Base Price: ₹{finalPlace.packagePricing?.basePrice}</p>
                  <p>Additional Fees: ₹{finalPlace.packagePricing?.additionalFees}</p>
                  <p className="font-bold text-lg mt-2">Final Price: ₹{finalPlace.packagePricing?.finalPrice} <span className="text-sm text-gray-500">(after {finalPlace.packagePricing?.discount}% discount)</span></p>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </Layout>
  );
  
};

export default PlaceDetails;
