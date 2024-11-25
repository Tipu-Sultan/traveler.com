
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDetails } from '../redux/slices/bookingSlice';
import calculateCheckoutPrice from '../services/calculateCheckoutPrice';
import usePackageData from './usePackageData';

const useBookingData = (packageId = null) => {
  const dispatch = useDispatch();
  const {finalPlace,loading,place, error } = usePackageData(packageId);
  const { bookingDetails } = useSelector((state) => state.booking);

  const checkoutPrice = calculateCheckoutPrice(finalPlace?.packagePricing?.finalPrice, bookingDetails?.travelers, bookingDetails?.extraRooms);


  useEffect(() => {
    if (finalPlace) {
      dispatch(
        setBookingDetails({
          endPoint:finalPlace?.locations?.state,
          packageId: finalPlace.packageId,
          shortDetails: finalPlace?.description?.short,
          checkoutPrice: checkoutPrice,
          hotelName: finalPlace?.hotels?.[0]?.name || '',
          travelDate: bookingDetails.travelDate,
          travelers: bookingDetails.travelers,
          extraRooms: bookingDetails.extraRooms,
          commuteType: bookingDetails.commuteType,
          packageName: finalPlace?.name,
        })
      );
    }
  }, [
    checkoutPrice,
    dispatch,
    finalPlace,
    bookingDetails.travelDate,
    bookingDetails.travelers,
    bookingDetails.extraRooms,
    bookingDetails.commuteType,
    bookingDetails.packageName,
  ]);
  

  return { checkoutPrice, bookingDetails,place,finalPlace,loading, error };
};

export default useBookingData;
