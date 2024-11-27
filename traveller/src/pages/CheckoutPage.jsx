import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking } from '../redux/slices/bookingSlice';
import { generateOrderId } from '../services/orderIdGenerator';
import Layout from '../layout/Layout';
import useTravelerDetails from '../hooks/useTravelerDetails';
import BookingSummary from '../components/booking/BookingSummary';
import TravelerDetailsForm from '../components/booking/TravelerDetailsForm';
import useAuthData from '../hooks/useAuthData';
import useBookingData from '../hooks/useBookingData';
import useBookingForm from '../hooks/useBookingForm';


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const packageId = searchParams.get('packageId');
  const packages = searchParams.get('package');

  const navigate = useNavigate();
  const { userData,isAuthenticated } = useAuthData()
  const {checkoutPrice} = useBookingData(packageId)
  const {updateBookingDetails} = useBookingForm();

  const { bookingDetails,loading } = useSelector((state) => state.booking);
  
  const bookingId = generateOrderId(bookingDetails && (bookingDetails.packageName || packages));

  useEffect(() => {
    const date = searchParams.get('date');
    const travelers = searchParams.get('travelers');
  

    if (date && date !== bookingDetails.travelDate) {
      updateBookingDetails('travelDate', date);
    }
    if (travelers && travelers !== bookingDetails.travelers) {
      updateBookingDetails('travelers', travelers || 1);
    }
  
  }, [location.search]); 

  const [travelerDetails, handleInputChange] = useTravelerDetails(
    {
      name: bookingDetails.name || '',
      email: bookingDetails.email || '',
      contact: bookingDetails.contact || '',
      gender: bookingDetails.gender || '',
    },
    bookingDetails,
    bookingId,
    packageId,
    userData
  );

  const handleConfirmBooking = useCallback(() => {
    if (isAuthenticated) {
      const bookingPayload = {
        startPoint:bookingDetails?.startPoint || ' ',
        endPoint:bookingDetails?.endPoint || ' ',
        bookingId: bookingDetails?.bookingId,
        package:bookingDetails?.packageName,
        packageId,
        userId: bookingDetails?.userId,
        travelersDetails: travelerDetails,
        bookingDate: new Date(),
        travelDate: bookingDetails?.travelDate,
        numberOfPeople: bookingDetails?.travelers,
        totalCost: bookingDetails?.packagePrice || checkoutPrice,
        commuteType: bookingDetails?.commuteType,
        hotelName: bookingDetails?.hotelName,
        numberOfRooms: bookingDetails?.extraRooms,
      };

      dispatch(createBooking(bookingPayload))
        .then(() => navigate(`/booking/checkout/payment?start=${bookingDetails?.startPoint}&end=${bookingDetails?.endPoint}&date=${bookingDetails.travelDate}&travelers=${bookingDetails.travelers}&commute=${bookingDetails?.commuteType}&package=${bookingDetails?.packageName}&hotel=${bookingDetails?.hotelName}&packageId=${packageId}`))
        .catch((error) => console.error("Booking creation failed:", error));
    } else {
      navigate(`/login?redirect=/booking?=start=${bookingDetails?.startPoint}&end=${bookingDetails?.endPoint}&date=${bookingDetails.travelDate}&travelers=${bookingDetails.travelers}&commute=${bookingDetails?.commuteType}&package=${bookingDetails?.packageName}&hotel=${bookingDetails?.hotelName}&packageId=${packageId}`);
    }
  }, [bookingDetails?.bookingId, bookingDetails?.commuteType, bookingDetails?.endPoint, bookingDetails?.extraRooms, bookingDetails?.hotelName, bookingDetails?.packageName, bookingDetails?.packagePrice, bookingDetails?.startPoint, bookingDetails.travelDate, bookingDetails.travelers, bookingDetails?.userId, checkoutPrice, dispatch, isAuthenticated, navigate, packageId, travelerDetails]);

 

  return (
    <Layout>
      <div className="min-h-screen bg-sky-50 flex flex-col items-center p-6">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        <BookingSummary   bookingDetails={bookingDetails} />
        <TravelerDetailsForm
            loading={loading}
            travelerDetails={travelerDetails}
            handleInputChange={handleInputChange}
            handleConfirmBooking={handleConfirmBooking}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
