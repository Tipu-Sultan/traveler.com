import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createBooking } from '../redux/slices/bookingSlice';
import { generateOrderId } from '../services/orderIdGenerator';
import Layout from '../layout/Layout';
import useTravelerDetails from '../hooks/useTravelerDetails';
import BookingSummary from '../components/booking/BookingSummary';
import TravelerDetailsForm from '../components/booking/TravelerDetailsForm';
import useBookingForm from '../hooks/useBookingForm';
import useAuthData from '../hooks/useAuthData';
import useBookingData from '../hooks/useBookingData';


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const packageId = searchParams.get('packageId');
  const navigate = useNavigate();
  const { userData,isAuthenticated } = useAuthData()
  const {checkoutPrice,finalPlace} = useBookingData(packageId)
  const { bookingDetails,loading } = useSelector((state) => state.booking);
  
  const bookingId = generateOrderId(bookingDetails&&bookingDetails.packageName);
  const {
    travelDate,
    setTravelDate, 
    setTravelers,
    setStartPoint,
    setEndPoint,
    setPackageId,
    setHotelName,
    setPackageName,
    setCommuteType
  } = useBookingForm(bookingDetails);

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
        startPoint:bookingDetails.startPoint || ' ',
        endPoint:bookingDetails.endPoint || ' ',
        bookingId: bookingDetails.bookingId,
        package:bookingDetails.packageName,
        packageId,
        userId: userData._id,
        travelersDetails: travelerDetails,
        bookingDate: new Date(),
        travelDate: bookingDetails.travelDate,
        numberOfPeople: bookingDetails.travelers,
        totalCost: bookingDetails.packagePrice || checkoutPrice,
        commuteType: bookingDetails.commuteType,
        hotelName: bookingDetails.hotelName,
        numberOfRooms: bookingDetails.extraRooms,
      };

      dispatch(createBooking(bookingPayload))
        .then(() => navigate(`/booking/checkout/payment?start=${bookingDetails?.startPoint}&end=${bookingDetails?.endPoint}&date=${bookingDetails.travelDate}&travelers=${bookingDetails.travelers}&commute=${bookingDetails?.commuteType}&package=${bookingDetails?.packageName}&hotel=${bookingDetails?.hotelName}&packageId=${packageId}`))
        .catch((error) => console.error("Booking creation failed:", error));
    } else {
      navigate(`/login?redirect=/booking?=start=${bookingDetails?.startPoint}&end=${bookingDetails?.endPoint}&date=${bookingDetails.travelDate}&travelers=${bookingDetails.travelers}&commute=${bookingDetails?.commuteType}&package=${bookingDetails?.packageName}&hotel=${bookingDetails?.hotelName}&packageId=${packageId}`);
    }
  }, [bookingDetails.bookingId, bookingDetails.commuteType, bookingDetails.endPoint, bookingDetails.extraRooms, bookingDetails.hotelName, bookingDetails.packageName, bookingDetails.packagePrice, bookingDetails.startPoint, bookingDetails.travelDate, bookingDetails.travelers, checkoutPrice, dispatch, isAuthenticated, navigate, packageId, travelerDetails, userData._id]);

  // Fetch the "end" query param from URL and trigger search on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('start') && params.get('end')) {
      setStartPoint(params.get('start') || '');
      setEndPoint(params.get('end'));
      setTravelDate(params.get('date') || '');
      setTravelers(params.get('travelers') || 1);
      setPackageId(params.get('packageId') || '');
      setHotelName(finalPlace?.hotels?.[0]?.name || '');
      setPackageName(finalPlace?.name || '');
      setCommuteType(params.get('commute') || '');
    }
  }, [finalPlace?.hotels, finalPlace?.name, finalPlace.packageId, location.search, setCommuteType, setEndPoint, setHotelName, setPackageId, setPackageName, setStartPoint, setTravelDate, setTravelers]);


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
