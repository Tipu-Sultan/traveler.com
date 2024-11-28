// src/pages/BookingPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import useBookingForm from '../hooks/useBookingForm';
import PlaceCarousel from '../components/Carousel';
import Layout from '../layout/Layout';
import BookingDetailsForm from '../components/booking/BookingDetailsForm';
import BookingSummary from '../components/booking/BookingSummary';
import PlaceDetails from '../components/booking/PlaceDetails';
import Policies from '../components/booking/Policies';
import PlaceSummary from '../components/booking/PlaceSummary';
import Spinner from '../components/Spinner';
import useBookingData from '../hooks/useBookingData';
import DynamicBreadcrumbs from '../components/Breadcrumbs';

const BookingPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
  const packageId = searchParams.get('packageId');
  const navigate = useNavigate();

  const { finalPlace, loading, error } = useBookingData(packageId);

  const {
    bookingDetails,
    updateBookingDetails
  } = useBookingForm();
  const [cnfmBooking, setCnfmBooking] = useState(false);
  useEffect(() => {
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');
    const date = searchParams.get('date');
    const travelers = searchParams.get('travelers');
  
    // Update bookingDetails if URL params change
    if (startParam && startParam !== bookingDetails.startPoint) {
      updateBookingDetails('startPoint', startParam);
    }
    if (endParam && endParam !== bookingDetails.endPoint) {
      updateBookingDetails('endPoint', endParam);
    }
    if (date && date !== bookingDetails.travelDate) {
      updateBookingDetails('travelDate', date);
    }
    if (travelers && travelers !== bookingDetails.travelers) {
      updateBookingDetails('travelers', travelers || 1);
    }
  }, [location.search]);

  const handleProceedToPayment = () => {
    const redirectUrl = encodeURIComponent(
      `/booking/checkout?start=${bookingDetails.startPoint}&end=${bookingDetails.endPoint}&date=${bookingDetails.travelDate}&travelers=${bookingDetails.travelers}&packageId=${packageId}`
    );

    if (!isAuthenticated) {
      navigate(`/login?redirect=${redirectUrl}`);
    } else {
      setCnfmBooking(true);
      navigate(`/booking/checkout?start=${bookingDetails?.startPoint}&end=${bookingDetails?.endPoint}&date=${bookingDetails.travelDate}&travelers=${bookingDetails.travelers}&commute=${bookingDetails?.commuteType}&package=${bookingDetails?.packageName}&hotel=${bookingDetails?.hotelName}&packageId=${packageId}`);
    }
  };




  return (
    <Layout>
      {loading === 'userLoading' ? (
        <Spinner />
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="bg-gray-100 py-10">
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <DynamicBreadcrumbs url={'/search/booking'} className="mb-8 text-blue-600 text-sm" />
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

            {/* Tab Panel */}
            <TabGroup>
              <TabList className="flex space-x-1 bg-blue-500 p-1 rounded-lg">
                <Tab className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
                ${selected ? 'bg-white text-blue-500' : 'text-white bg-blue-500'}`}
                >
                  Itinerary
                </Tab>
                <Tab className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
                ${selected ? 'bg-white text-blue-500' : 'text-white bg-blue-500'}`}
                >
                  Policies
                </Tab>
                <Tab className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
                ${selected ? 'bg-white text-blue-500' : 'text-white bg-blue-500'}`}
                >
                  Summary
                </Tab>
              </TabList>

              <TabPanels className="mt-4">
                {/* Itinerary Tab */}
                <TabPanel className="p-4 rounded-lg bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Column: Itinerary */}
                    <div>
                      <PlaceDetails place={finalPlace} />
                    </div>

                    {/* Second Column: Booking Details and Summary */}
                    <div>
                      {/* Booking Details Section */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold">Booking Details</h3>
                        <BookingDetailsForm bookingDetails={bookingDetails} />
                      </div>

                      {/* Summary Section below Booking Details */}
                      <div className="mt-4">
                        <h3 className="text-lg font-bold">Summary</h3>
                        <BookingSummary  bookingDetails={bookingDetails} />
                      </div>
                    </div>
                  </div>
                </TabPanel>

                {/* Policies Tab */}
                <TabPanel className="p-4 rounded-lg bg-gray-100">
                  <Policies finalPlace={finalPlace} />
                </TabPanel>

                {/* Summary Tab */}
                <TabPanel className="p-4 rounded-lg bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Booking Summary Column */}
                  <div>
                    <BookingSummary
                      bookingDetails={bookingDetails}
                    />
                  </div>

                  {/* Itinerary Details Column */}
                  <PlaceSummary place={finalPlace} />
                </TabPanel>
              </TabPanels>
            </TabGroup>

            {/* Confirm Booking Button */}
            <div className="mt-6">
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-gradient-to-r from-orange-500 to-sky-500 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-300"
              >
                {cnfmBooking ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookingPage;
