import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBookingDetails } from '../redux/slices/bookingSlice';

const useTravelerDetails = (initialDetails, bookingDetails, bookingId, packageId, userData) => {
  const dispatch = useDispatch();
  const [travelerDetails, setTravelerDetails] = useState(initialDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTravelerDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const { name, email, contact, gender } = travelerDetails;
    if (
      name !== bookingDetails.name ||
      email !== bookingDetails.email ||
      contact !== bookingDetails.contact ||
      gender !== bookingDetails.gender
    ) {
      dispatch(setBookingDetails({
        bookingId,
        packageId,
        userId: userData._id,
        name,
        email,
        contact,
        gender
      }));
    }
  }, [travelerDetails, bookingDetails, bookingId, packageId, userData._id, dispatch]);

  return [travelerDetails, handleInputChange];
};

export default useTravelerDetails;
