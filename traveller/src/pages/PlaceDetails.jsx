import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import Spinner from '../components/Spinner';
import Error from '../layout/Error';
import usePackageData from '../hooks/usePackageData';
import PlaceDetailsInfo from '../components/PlaceDetailsInfo';
import DynamicBreadcrumbs from '../components/Breadcrumbs';
import HotelsList from '../components/hotel/HotelList';
import ServicesList from '../components/service/ServicesList';
import PlaceCarousel from '../components/Carousel';

const PlaceDetails = () => {
  const location = useLocation();
  const { packageId } = useParams();
  const { finalPlace, nearbyHotels, bikesorCar, petrolStations, loading, error } = usePackageData(packageId);
  const [activeTab, setActiveTab] = React.useState('hotels');
  const [showPanels, setShowPanels] = React.useState(false); // To toggle Hotels and Services

  const handleTabChange = (tab) => setActiveTab(tab);

  const togglePanels = () => setShowPanels((prev) => !prev); // Toggle panel visibility

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
              <DynamicBreadcrumbs url={'/search/place'} className="mb-8 text-blue-600 text-sm" />

              {/* Top Section: Left - Package Info | Right - Image Carousel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg bg-gray-100">
                {/* First Column */}
                <div>
                  <h2 className="text-2xl font-semibold">{finalPlace?.name}</h2>

                  {/* Duration Badge */}
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      {finalPlace?.duration?.days} Days / {finalPlace?.duration?.nights} Nights
                    </span>
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      {finalPlace?.category}
                    </span>
                  </div>

                  {/* Visit Sites */}
                  <p className="text-gray-600 mt-4">
                    {finalPlace?.visitSites?.map((site, index) => (
                      <span key={index} className="inline-flex items-center mr-4">
                        <span className="font-bold mr-2">•</span>
                        <span className="font-semibold">{site.name}</span>
                      </span>
                    ))}
                  </p>

                  <p className="text-gray-600 mt-4">
                    {['village', 'city', 'state', 'country'].map((key, index) => (
                      finalPlace?.locations?.[key] && (
                        <span key={index} className="mr-2">
                          <span className="font-bold mr-2">•</span>
                          <span className="font-semibold">{`${finalPlace.locations[key]}`}</span>
                        </span>
                      )
                    ))}
                  </p>

                  {/* Description */}
                  {finalPlace?.description && (
                    <p className="text-gray-600 mt-2">{finalPlace?.description.detailed}</p>
                  )}
                </div>

                {/* Second Column (Carousel) */}
                <div>
                  <PlaceCarousel images={finalPlace.media?.photos} />
                </div>
              </div>

              {/* Toggle Button for Hotels and Services Panel (Visible on mobile/tablet only) */}
              <div className="block lg:hidden mb-6">
                <button
                  className={`py-2 px-4 rounded-lg ${showPanels ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                  onClick={togglePanels}
                >
                  {showPanels ? 'Hide Suggestions' : 'Show Suggestions'}
                </button>
              </div>

              {/* Bottom Section: Left - Hotels/Services Panel | Right - Itinerary */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Panel for Hotels and Services (Always visible on large screens) */}
                <div className={`lg:block lg:w-1/4 p-4 bg-white shadow-lg rounded-lg space-y-5 ${!showPanels && 'hidden lg:block'}`}>
                  {(
                    <>
                      <div className="mb-6">
                        <button
                          className={`py-2 px-4 font-semibold ${activeTab === 'hotels' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                          onClick={() => handleTabChange('hotels')}
                        >
                          Hotels
                        </button>
                        <button
                          className={`py-2 px-4 font-semibold ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                          onClick={() => handleTabChange('services')}
                        >
                          Services
                        </button>
                      </div>

                      {activeTab === 'hotels' ? (
                        <HotelsList hotels={nearbyHotels} />
                      ) : (
                        <ServicesList services={[...bikesorCar, ...petrolStations]} />
                      )}
                    </>
                  )}
                </div>

                {/* Right - Itinerary with Scroll Effect */}
                <div className="lg:w-3/4 p-4 bg-white shadow-lg rounded-lg">
                  <PlaceDetailsInfo place={finalPlace} />
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
