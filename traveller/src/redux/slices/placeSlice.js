// src/redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placeServices from '../services/placeService';

const initialState = {
  place:{},
  featuredPlace:[],
  hotel:{},
  bikeRentalData:{},
  nearbyHotels: [],
  bikesorCar: [],
  petrolStations: [],
  loading: false,
  error: null,
};

export const fetchPlaceServices = createAsyncThunk('/place/services', placeServices.fetchPlaceServices);
export const fetchFeaturedPlaces = createAsyncThunk('/place/featured', placeServices.fetchFeaturedPlaces);
export const fetchPlace = createAsyncThunk('/place', placeServices.fetchPlace);
export const fetchHotel = createAsyncThunk('/hotel', placeServices.fetchHotel);
export const fetchBikeRental = createAsyncThunk('/bike-rental', placeServices.fetchBikeRental);




const tripSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    clearServices(state) {
      state.hotel = [];
      state.bikesorCar = [];
      state.petrolStations = [];

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaceServices.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyHotels = action.payload.nearbyHotels;
        state.bikesorCar = action.payload.nearbyBikeRentals;
      })
      .addCase(fetchPlaceServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.nearbyHotels = [];
        state.bikesorCar = [];
      })


      .addCase(fetchPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.place = action.payload; 
        state.error = null;
      })
      .addCase(fetchPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.place = [];
      })


      .addCase(fetchFeaturedPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredPlace = action.payload; 
        state.error = null;
      })
      .addCase(fetchFeaturedPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.featuredPlace = [];
      })

      
      .addCase(fetchHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotel = action.payload; 
        state.error = null;
      })
      .addCase(fetchHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hotel = [];
      })

      .addCase(fetchBikeRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBikeRental.fulfilled, (state, action) => {
        state.loading = false;
        state.bikeRentalData = action.payload; 
        state.error = null;
      })
      .addCase(fetchBikeRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.bikeRentalData = [];
      })
      ;
  },
});

export const { clearServices } = tripSlice.actions;

export default tripSlice.reducer;
