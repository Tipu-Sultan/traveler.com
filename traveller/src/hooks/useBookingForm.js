// src/hooks/useBookingForm.js
import { useState, useEffect } from 'react';
import { setBookingDetails } from '../redux/slices/bookingSlice';
import { useDispatch } from 'react-redux';

const useBookingForm = (initialBookingDetails = null) => {
  const dispatch = useDispatch();
  const [travelDate, setTravelDate] = useState(
    initialBookingDetails?.travelDate
      ? new Date(initialBookingDetails.travelDate).toLocaleDateString()
      : new Date().toLocaleDateString()
  );

  const [travelers, setTravelers] = useState(initialBookingDetails?.travelers || 1);
  const [extraRooms, setExtraRooms] = useState(initialBookingDetails?.extraRooms || 0);
  const [commuteType, setCommuteType] = useState(initialBookingDetails?.commuteType || '');
  const [hotelName, setHotelName] = useState(initialBookingDetails?.hotelName || '');
  const [startPoint, setStartPoint] = useState(initialBookingDetails?.startPoint || '');
  const [endPoint, setEndPoint] = useState(initialBookingDetails?.endPoint || '');
  const [packageId, setPackageId] = useState(initialBookingDetails?.packageId || '');
  const [packageName, setPackageName] = useState(initialBookingDetails?.packageName || '');
  const [showCalendar, setShowCalendar] = useState(false);


  // Individual useEffect hooks for each state property
  useEffect(() => {
    dispatch(setBookingDetails({ travelDate }));
  }, [travelDate, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ travelers }));
  }, [travelers, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ extraRooms }));
  }, [extraRooms, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ commuteType }));
  }, [commuteType, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ hotelName }));
  }, [hotelName, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ startPoint }));
  }, [startPoint, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ endPoint }));
  }, [endPoint, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ packageId }));
  }, [packageId, dispatch]);

  useEffect(() => {
    dispatch(setBookingDetails({ packageName }));
  }, [dispatch, packageName]);

  const handleDateChange = (date) => {
    setTravelDate(date.toLocaleDateString());
    setShowCalendar(false);
  };

  return {
    travelDate,
    travelers,
    extraRooms,
    commuteType,
    hotelName,
    startPoint,
    endPoint,
    showCalendar,
    setShowCalendar,
    setTravelDate,
    setTravelers,
    setExtraRooms,
    setCommuteType,
    setHotelName,
    setStartPoint,
    setEndPoint,
    handleDateChange,
    setPackageId,
    setPackageName
  };
};

export default useBookingForm;
