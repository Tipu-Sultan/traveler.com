import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDetails } from '../redux/slices/bookingSlice';

const useBookingForm = () => {
  const dispatch = useDispatch();

  // Access bookingDetails directly from the Redux state
  const bookingDetails = useSelector((state) => state.booking.bookingDetails);

  const [showCalendar, setShowCalendar] = useState(false);

  const updateBookingDetails = (key, value) => {
    dispatch(setBookingDetails({ [key]: value }));
  };

  const handleDateChange = (date) => {
    updateBookingDetails('travelDate', date.toLocaleDateString());
  };

  return {
    showCalendar,
    setShowCalendar,
    bookingDetails,
    updateBookingDetails,
    handleDateChange,
  };
};

export default useBookingForm;
