import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingServices from '../services/bookingService';

const initialState = {
  updateBooking: {},
  loading: 'idle',
  message: '',
  error: false,
  bookingDetails: JSON.parse(localStorage.getItem('bookingDetails')) || { // Load from localStorage if available
    startPoint: '',
    endPoint: '',
    bookingId: '',
    travelDate: '',
    departureDate: '',
    travelers: 1,
    extraRooms: 0,
    hotelName: '',
    commuteType: 'on your own',
    userId: '',
    packageName: '',
    shortDetails: '',
    packageId: '',
    packagePrice: 0.0,
    checkoutPrice: 0.0,
    travelersDetails: {
      name: '',
      email: '',
      contact: '',
      gender: '',
    },
  },
};

export const createBooking = createAsyncThunk('booking/createBooking', bookingServices.createBooking);
export const updateBooking = createAsyncThunk('booking/updateBooking', bookingServices.updateBooking);
export const getBookingDetails = createAsyncThunk('booking/getBookingDetails', bookingServices.getBookingDetails);
export const createPaymentRequest = createAsyncThunk('booking/createPaymentRequest', bookingServices.createPaymentRequest);
export const updatePaymentRequest = createAsyncThunk('booking/updatePaymentRequest', bookingServices.updatePaymentRequest);
export const deletePaymentRequest = createAsyncThunk('booking/deletePaymentRequest', bookingServices.deletePaymentRequest);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDetails(state, action) {
      // Update the Redux state with the new booking details
      state.bookingDetails = { ...state.bookingDetails, ...action.payload };
    
      // Save only specific fields to localStorage
      const { startPoint, endPoint, travelDate, travelers, ...rest } = state.bookingDetails;
      localStorage.setItem('bookingDetails', JSON.stringify(rest));
    },
    
    clearbookingDetails(state) {
      state.bookingDetails = null;
      localStorage.removeItem('bookingDetails'); // Remove from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = 'creating';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = 'Booking created successfully';
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(updateBooking.pending, (state) => {
        state.loading = 'updating';
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload.message;
        state.updateBooking = action.payload.booking;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(getBookingDetails.pending, (state) => {
        state.loading = 'gettingDetails';
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload.message;
        state.updateBooking = action.payload.booking;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(createPaymentRequest.pending, (state) => {
        state.loading = 'createBooking';
      })
      .addCase(createPaymentRequest.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload;
      })
      .addCase(createPaymentRequest.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(updatePaymentRequest.pending, (state) => {
        state.loading = 'updateBooking';
      })
      .addCase(updatePaymentRequest.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload;
      })
      .addCase(updatePaymentRequest.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      });
  },
});

export const { setBookingDetails, clearbookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
