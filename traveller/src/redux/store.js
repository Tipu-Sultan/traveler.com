// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import searchReducer from './slices/searchSlice'; // Import the search slice
import placeReducer from './slices/placeSlice'; // Import the search slice
import bookingReducer from './slices/bookingSlice'; // Import the search slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    place: placeReducer,
    booking:bookingReducer

  },
});

export default store;
