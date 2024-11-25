import api from "../../api/api";

const fetchPlaceServices = async ({ packageId, placeName, city }, { rejectWithValue }) => {
  try {
    const response = await api.get(`/places/place/services`, {
      params: { packageId, placeName, city }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Seraching faild failed');

  }
};


const fetchFeaturedPlaces = async (_,{ rejectWithValue }) => {
  try {
    const response = await api.get(`/places/place/featured`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Seraching faild failed');

  }
};


const fetchPlace = async (packageId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/places/${packageId}`); // Use placeId as path parameter
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Searching failed');
  }
};

const fetchHotel = async (hotelId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/places/hotel/${hotelId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Searching failed');
  }
};

const fetchBikeRental = async (rentalId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/places/bike-rental/${rentalId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Searching failed');
  }
};


const tripServices = { fetchPlaceServices, fetchPlace, fetchHotel, fetchBikeRental, fetchFeaturedPlaces};
export default tripServices;