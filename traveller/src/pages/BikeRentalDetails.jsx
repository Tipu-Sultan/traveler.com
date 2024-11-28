import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Spinner from '../components/Spinner';
import Layout from '../layout/Layout';
import DynamicBreadcrumbs from '../components/Breadcrumbs';
import { fetchBikeRental } from '../redux/slices/placeSlice';
import Error from '../layout/Error';

const BikeRentalDetails = () => {
    const { rentalId } = useParams();
    const dispatch = useDispatch();
    const { bikeRentalData, loading, error, bikesorCar } = useSelector((state) => state.place);
    const filterBikeRental = bikesorCar.find(bike => bike.bike_rental_id === rentalId);

    useEffect(() => {
        dispatch(fetchBikeRental(rentalId));
    }, [dispatch, rentalId]);

    let bikeRental = !filterBikeRental ? bikeRentalData : filterBikeRental;

    return (
        <Layout title="Bike Rental Details | Traveller.com" description="Explore thrilling bike rentals with Traveller.com">
            {error ? (
                <div className="flex  justify-center items-center h-screen">
                    <Error error={error} />
                </div>
            ) : (
                !loading && (
                    <>
                        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto rounded-lg">
                            <DynamicBreadcrumbs url={'/booking/rental'} />

                            {/* Loading spinner */}
                            {loading && <Spinner />}

                            {/* Carousel for bike rental images */}
                            <Carousel showThumbs={false} className="mb-4">
                                {bikeRental?.media?.photos?.map((photo, index) => (
                                    <div key={index}>
                                        <img src={photo} alt={`bike rental view ${index + 1}`} className="rounded-lg h-96 object-cover" />
                                    </div>
                                ))}
                            </Carousel>

                            {/* Rental details section */}
                            <div className="text-center mb-6">
                                <h1 className="text-4xl font-semibold text-gray-800">{bikeRental?.name}</h1>
                                <p className="text-lg text-gray-600">{bikeRental?.locationName}</p>
                                <p className="text-lg text-yellow-500">{`⭐️`.repeat(Math.round(bikeRental?.ratings?.average_rating))}</p>
                                <p className="text-gray-700">{`(${bikeRental?.ratings?.total_reviews} reviews)`}</p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 text-base mb-6">{bikeRental?.description}</p>

                            {/* Contact and pricing information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                                    <p>Phone: {bikeRental?.contact?.phone_number}</p>
                                    <p>Email: <a href={`mailto:${bikeRental?.contact?.email}`} className="text-blue-500">{bikeRental?.contact?.email}</a></p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Pricing</h3>
                                    <p>Price per Hour: {bikeRental?.pricing?.currency} {bikeRental?.pricing?.price_per_hour}</p>
                                    <p>Price per Day: {bikeRental?.pricing?.currency} {bikeRental?.pricing?.price_per_day}</p>
                                </div>
                            </div>

                            {/* Availability and amenities */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Availability</h3>
                                    <p>Available Days: {bikeRental?.availability?.days.join(', ')}</p>
                                    <p>Hours: {bikeRental?.availability?.hours}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Amenities</h3>
                                    <ul className="list-disc ml-5 text-gray-700">
                                        {bikeRental?.amenities?.map((amenity, index) => (
                                            <li key={index}>{amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )
            )}
        </Layout>
    );
};

export default BikeRentalDetails;
