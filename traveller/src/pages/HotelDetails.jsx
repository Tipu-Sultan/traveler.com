import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { fetchHotel } from '../redux/slices/placeSlice';
import Modal from 'react-modal';
import Spinner from '../components/Spinner';
import Layout from '../layout/Layout';
import DynamicBreadcrumbs from '../components/Breadcrumbs';
import Error from '../layout/Error';

// Set modal root element
Modal.setAppElement('#root');

const HotelDetails = () => {
    const { hotelId } = useParams();
    const dispatch = useDispatch();
    const [videoModalOpen, setVideoModalOpen] = useState(false);

    const { hotel, loading, error, nearbyHotels } = useSelector((state) => state.place);
    const filterHotel = nearbyHotels.find(hotel => hotel.hotel_id === hotelId);

    useEffect(() => {
        if (!filterHotel) {
            dispatch(fetchHotel(hotelId));
        }
    }, [dispatch, hotelId]);

    const openVideoModal = () => setVideoModalOpen(true);
    const closeVideoModal = () => setVideoModalOpen(false);

    let finalHotel = !filterHotel ? hotel : filterHotel

    return (
        <Layout title="Hotel Details | Traveller.com" description="Explore the best destinations with Traveller.com">
            {error ? (
                <div className="flex  justify-center items-center h-screen">
                    <Error error={error} />
                </div>
            ) : (
                !loading && (
                    <>
                        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto bg-white rounded-lg">
                            <div className="flex-1">
                                <DynamicBreadcrumbs />
                                {/* Loading spinner */}
                                {loading && (
                                    <Spinner />
                                )}

                                {/* Error message */}

                                <Carousel showThumbs={false} className="mb-4">
                                    {finalHotel?.media?.photos?.map((photo, index) => (
                                        <div key={index}>
                                            <img src={photo} alt={`hotel view ${index + 1}`} className="rounded-lg" />
                                        </div>
                                    ))}
                                </Carousel>

                                <div className="text-center mb-4">
                                    <h1 className="text-4xl font-semibold text-gray-800">{finalHotel?.name}</h1>
                                    <p className="text-lg text-gray-600">{finalHotel?.location?.city}, {finalHotel?.location?.state}</p>
                                    <p className="text-lg text-yellow-500">{`⭐️`.repeat(finalHotel?.star_rating)}</p>
                                </div>

                                <p className="text-gray-700 text-base mb-6">{finalHotel?.description}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                                        <p>Phone: {finalHotel?.contact?.phone}</p>
                                        <p>Email: <a href={`mailto:${finalHotel?.contact?.email}`} className="text-blue-500">{finalHotel?.contact?.email}</a></p>
                                        <p>Website: <a href={finalHotel?.contact?.website} target="_blank" rel="noreferrer" className="text-blue-500">{finalHotel?.contact?.website}</a></p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Location</h3>
                                        <p>{finalHotel?.location?.address}</p>
                                        <p>{finalHotel?.location?.city}, {finalHotel?.location?.state}, {finalHotel?.location?.country}</p>
                                        <p>Postal Code: {finalHotel?.location?.postal_code}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg mb-2">Amenities</h3>
                                    <ul className="list-disc ml-5 text-gray-700">
                                        {finalHotel?.amenities?.map((amenity, index) => <li key={index}>{amenity}</li>)}
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg mb-2">Policies</h3>
                                    <p><strong>Check-In:</strong> {finalHotel?.policies?.check_in_time}</p>
                                    <p><strong>Check-Out:</strong> {finalHotel?.policies?.check_out_time}</p>
                                    <p><strong>Cancellation:</strong> {finalHotel?.policies?.cancellation_policy}</p>
                                    <p><strong>Pet Policy:</strong> {finalHotel?.policies?.pet_policy}</p>
                                    <p><strong>Smoking Policy:</strong> {finalHotel?.policies?.smoking_policy}</p>
                                </div>

                                <div className="flex items-center justify-center mt-4">
                                    <button onClick={openVideoModal} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md">
                                        View Video
                                    </button>
                                </div>
                            </div>


                            {/* Side Panel for Offers */}
                            <aside className="w-full md:w-64">
                                <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Offers & Discounts</h3>
                                    {finalHotel?.pricing?.discounts?.map((discount, index) => (
                                        <p key={index} className="text-gray-700">
                                            - {discount.description}: ₹{discount.amount} off
                                        </p>
                                    ))}
                                    <p className="text-gray-700 mt-2">Base Price: ₹{finalHotel?.pricing?.base_price} per night</p>
                                </div>
                            </aside>


                            {/* Video Modal */}
                            <Modal
                                isOpen={videoModalOpen}
                                onRequestClose={closeVideoModal}
                                contentLabel="Hotel Video"
                                className="modal-content w-11/12 md:w-1/2 mx-auto mt-24 bg-white rounded-lg shadow-lg outline-none p-4"
                                overlayClassName="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-75"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Hotel Video Preview</h2>
                                    <button onClick={closeVideoModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                                </div>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`${finalHotel?.media?.videos[0]}`}
                                    title="Hotel Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </Modal>
                        </div>
                    </>
                )
            )}
        </Layout>
    );
};

export default HotelDetails;
