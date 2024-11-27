import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearSuggestions, fetchSuggestions } from '../redux/slices/searchSlice'; // Adjust the import path as needed
import { useLocation, useNavigate } from 'react-router-dom';
import useBookingForm from '../hooks/useBookingForm';
import Calendar from 'react-calendar';

const SearchBar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    showCalendar,
    setShowCalendar,
    bookingDetails,
    updateBookingDetails,
    handleDateChange,
  } = useBookingForm();

  const debounceTimeout = 300;
  const debounceTimer = useRef(null); // Timer for debouncing suggestions
  const previousQueryRef = useRef(''); // Track previous query

  // Redux state for suggestions
  const { suggestions, loading } = useSelector((state) => state.search);

  useEffect(() => {
    const startParam = params.get('start');
    const endParam = params.get('end');
    const date = params.get('date');
    const travelers = params.get('travelers');
  
    // Update bookingDetails if URL params change
    if (startParam && startParam !== bookingDetails.startPoint) {
      updateBookingDetails('startPoint', startParam);
    }
    if (endParam && endParam !== bookingDetails.endPoint) {
      updateBookingDetails('endPoint', endParam);
    }
    if (date && date !== bookingDetails.travelDate) {
      updateBookingDetails('travelDate', date);
    }
    if (travelers && travelers !== bookingDetails.travelers) {
      updateBookingDetails('travelers', travelers || 1);
    }
  
    // Dispatch search again if the endParam is present
    if (endParam) {
      dispatch(search({ query: endParam, page: 1 }));
      dispatch(clearSuggestions());
    }
  }, [location.search]); // Trigger re-run on URL change
  

  useEffect(() => {
    const endParam = params.get('end');

    if (endParam) {
      dispatch(search({ query: endParam, page: 1 }));
      dispatch(clearSuggestions());
    }
  }, [dispatch])

  // Fetch suggestions based on endPoint with debouncing
  useEffect(() => {
    const endPoint = bookingDetails.endPoint;
  
    // Ensure the endpoint has changed and is different from the previous one to avoid repeated API calls.
    if (endPoint && endPoint !== previousQueryRef.current) {
      // Clear existing suggestions whenever the endpoint changes
      dispatch(clearSuggestions());
  
      // Start debouncing the API call
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
  
      // Set a new debounce timer
      debounceTimer.current = setTimeout(() => {
        // Dispatch the fetchSuggestions action
        dispatch(fetchSuggestions(endPoint));
        previousQueryRef.current = endPoint; // Update previous query
      }, debounceTimeout);
    }
  
    // Cleanup: Clear the debounce timer when the component is unmounted or dependencies change
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [dispatch, bookingDetails.endPoint]); // This will run when the endPoint value changes
  
  
  // Function to handle the search action when the "Search" button is clicked
  const handleSearch = () => {
    const query = `start=${bookingDetails?.startPoint}&end=${bookingDetails?.endPoint}&date=${bookingDetails?.travelDate}&travelers=${bookingDetails?.travelers}`;
    navigate(`/search?${query}`);
    dispatch(search({ query: bookingDetails?.endPoint, page: 1 }));
    dispatch(clearSuggestions());
  };

  // Handle input change for start or end point
  const handleInputChange = (key, value) => {
    updateBookingDetails(key, value);
    // Clear suggestions whenever the input changes
    dispatch(clearSuggestions());
  };

  return (
    <div className="flex justify-center m-5">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">
        {/* Start Point Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Starting Point"
            value={bookingDetails?.startPoint}
            onChange={(e) => handleInputChange('startPoint', e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            aria-label="Starting Point"
          />
        </div>

        {/* End Point Input with Suggestions */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ending Point"
            value={bookingDetails?.endPoint}
            onChange={(e) => handleInputChange('endPoint', e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            aria-label="Ending Point"
          />

          {/* Suggestions dropdown */}
          {bookingDetails?.endPoint && suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto mt-1">
              {loading === 'suggestion' ? (
                <li className="p-2 text-center text-gray-500">Loading...</li>
              ) : (
                suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleInputChange('endPoint', suggestion.state);
                      dispatch(clearSuggestions());
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    className="p-2 cursor-pointer hover:bg-orange-100 hover:text-orange-700 transition duration-150 ease-in-out"
                    role-area="option"
                  >
                    <strong>{suggestion.state}</strong> ({suggestion.citiesCount} cities)
                    <ul className="mt-1 text-sm text-gray-600">
                      {suggestion.cities.slice(0, 5).map((city, cityIndex) => (
                        <li key={cityIndex}>{city}</li>
                      ))}
                      {suggestion.cities.length > 5 && <li>+{suggestion.cities.length - 5} more</li>}
                    </ul>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Travel Date Picker */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            aria-label="Travel Date"
          >
            {bookingDetails?.travelDate ? bookingDetails?.travelDate : "Select Travel Date"}
          </button>

          {/* Calendar Modal */}
          {showCalendar && (
            <div onClick={() => setShowCalendar(!showCalendar)} className="absolute top-full mt-2 w-full z-20 bg-white border border-gray-300 rounded-lg shadow-lg">
              <Calendar onChange={handleDateChange} value={bookingDetails?.travelDate} />
            </div>
          )}
        </div>

        {/* Travelers Count */}
        <div>
          <input
            type="number"
            min="1"
            value={bookingDetails?.travelers}
            onChange={(e) => handleInputChange('travelers', e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            aria-label="Number of Travelers"
          />
        </div>

        {/* Search Button */}
        <div className="flex">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto h-12 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
