import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, fetchSuggestions, clearSuggestions } from '../redux/slices/searchSlice'; // Adjust the import path as needed
import { useLocation, useNavigate } from 'react-router-dom';
import useBookingForm from '../hooks/useBookingForm';
import Calendar from 'react-calendar';

const SearchBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookingDetails } = useSelector((state) => state.booking);

  const {
    travelDate,
    travelers,
    startPoint,
    endPoint,
    setTravelDate, 
    setTravelers,
    setStartPoint,
    setEndPoint,
    handleDateChange,
    showCalendar, 
    setShowCalendar
  } = useBookingForm(bookingDetails);

  const debounceTimeout = 300;
  const debounceTimer = useRef(null); // Timer for debouncing suggestions
  const previousQueryRef = useRef(''); // Track previous query

  // Redux state for suggestions
  const { suggestions, loading } = useSelector((state) => state.search);

  // Fetch the "end" query param from URL and trigger search on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const endParam = params.get('end') || '';

    setStartPoint(params.get('start') || '');
    setEndPoint(endParam);
    setTravelDate(params.get('date') || '');
    setTravelers(params.get('travelers') || 1);

    // Dispatch search action if "end" param is present
    if (endParam) {
      dispatch(search({ query: endParam, page: 1 }));
      dispatch(clearSuggestions());
    }
  }, [location.search, dispatch, setStartPoint, setEndPoint, setTravelDate, setTravelers]);

  // Fetch suggestions based on endPoint with debouncing
  useEffect(() => {
    if (endPoint.trim() && previousQueryRef.current !== endPoint) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Set a new debounce timer
      debounceTimer.current = setTimeout(() => {
        dispatch(fetchSuggestions(endPoint)); 
      dispatch(clearSuggestions());
        previousQueryRef.current = endPoint;
      }, debounceTimeout);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [endPoint, dispatch]);

  // Function to handle the search action
  const handleSearch = () => {
    const query = `start=${startPoint}&end=${endPoint}&date=${travelDate}&travelers=${travelers}`;
    navigate(`/search?${query}`);
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
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            aria-label="Starting Point"
          />
        </div>

        {/* End Point Input with Suggestions */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ending Point"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            aria-label="Ending Point"
          />

          {/* Suggestions dropdown */}
          {endPoint && suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto mt-1">
              {loading === 'suggestion' ? (
                <li className="p-2 text-center text-gray-500">Loading...</li>
              ) : (
                suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setEndPoint(suggestion.state); 
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
            {travelDate ? travelDate : "Select Travel Date"}
          </button>

          {/* Calendar Modal */}
          {showCalendar && (
            <div className="absolute top-full mt-2 w-full z-20 bg-white border border-gray-300 rounded-lg shadow-lg">
              <Calendar onChange={handleDateChange} value={travelDate} />
            </div>
          )}
        </div>

        {/* Travelers Count */}
        <div>
          <input
            type="number"
            min="1"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
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
