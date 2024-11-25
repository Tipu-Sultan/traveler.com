import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch, fetchSuggestions, search } from '../redux/slices/searchSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const debounceTimeout = 300;
  const debounceTimer = useRef(null); // Use useRef to store debounce timer
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('query');

  let { suggestions, loading } = useSelector((state) => state.search);

  // Function to handle the search action
  const handleSearch = (queryParam) => {
    if (queryParam.trim()) {
      navigate(`/search?query=${encodeURIComponent(queryParam)}`);
/    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      suggestions = []
      handleSearch(query);
    }
  };

  // Debounce function to fetch suggestions after a delay
  useEffect(() => {
    if (query.trim() && !(queryParam===query)) {
      // Clear the previous timer if it exists
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      // Set a new timer with debounce delay
      debounceTimer.current = setTimeout(() => {
        dispatch(fetchSuggestions(query));
      }, debounceTimeout);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, dispatch, queryParam]);

  useEffect(() => {
    try {
      if (queryParam) {
        setQuery(queryParam); // Set the query state
        dispatch(search({ query: queryParam, page: 1 }));
      }
    } catch (error) {
      enqueueSnackbar(error.error || 'Failed to register crime', { variant: 'error' });
    }
  }, [dispatch, queryParam]);

  return (
    <div className="flex justify-center m-5 relative">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Search for destinations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          className="w-full h-12 px-4 border border-gray-300 rounded-l-lg shadow-lg focus:outline-none transition duration-300 bg-white"
          aria-label="Search destinations"
        />
        <button
          onClick={() => handleSearch(query)}
          className="absolute right-0 top-0 h-12 px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition duration-300 flex items-center"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </button>

        {/* Suggestions dropdown */}
        {query && suggestions.length > 0 && (
          <ul
            className="absolute w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto animate-fadeIn transition-opacity duration-200"
          >
            {loading === 'suggestion' ? (
              <li className="p-2 text-center text-gray-500">Loading...</li>
            ) : (
              suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleSearch(suggestion);
                  }}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus loss on click
                  className="p-2 cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition duration-150 ease-in-out"
                  role-aria="option"
                >
                  {suggestion}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
