import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import searchServices from '../services/searchServices';

const initialState = {
  results: [],
  suggestions: [],
  totalPages: 0,
  currentPage: 1,
  loading: 'idle',
  searchError: null,
  suggestionsError: null,
};

export const search = createAsyncThunk('/places/search', searchServices.search);
export const fetchSuggestions = createAsyncThunk('/place/suggestions', searchServices.fetchSuggestions);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch(state) {
      state.results = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.suggestions = [];
      state.searchError = null; 
    },
    clearSuggestions(state) {
      state.suggestions = [];
      state.searchError = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the search action
      .addCase(search.pending, (state) => {
        state.loading = 'search';
        state.searchError = null; 
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.results = action.payload.packages;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.searchError = null; 
        state.suggestions = []; 
      })
      .addCase(search.rejected, (state, action) => {
        state.loading = 'idle';
        state.searchError = action.payload;
        state.results = [];
        state.totalPages = 0;
        state.currentPage = 1;
      })

      // Handle the suggestions action
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = 'suggestion';
        state.suggestionsError = null; 
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.suggestions = action.payload.map((stateData) => ({
          state: stateData.state.state, 
          citiesCount: stateData.state.cities.length, 
          cities: stateData.state.cities 
        }));
        state.suggestionsError = null;
      })      
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = 'idle';
        state.suggestionsError = action.payload; 
        state.suggestions = [];
      });
  },
});

export const { clearSearch,clearSuggestions} = searchSlice.actions;

export default searchSlice.reducer;
