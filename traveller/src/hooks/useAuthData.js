import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/slices/authSlices";

const useAuthData = () => {
  const dispatch = useDispatch();
  const { loading, error, user, PaymentAndBookingData, message } = useSelector((state) => state.auth);

  // Get `user` and `isAuthenticated` from localStorage as fallback
  const localUser = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const userData = user || localUser;

  useEffect(() => {
    const idToFetch = userData?._id;
    if (isAuthenticated && idToFetch && (!user || !PaymentAndBookingData)) {
      dispatch(fetchUserData(idToFetch));
    }
  }, [dispatch, isAuthenticated, user, userData?._id, PaymentAndBookingData]);

  return {
    userData,
    PaymentAndBookingData,
    isAuthenticated,
    loading,
    message,
    error,
  };
};

export default useAuthData;
