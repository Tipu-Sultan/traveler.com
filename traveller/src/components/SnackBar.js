// components/Snackbar.js
import React from 'react';

const SnackBar = () => {
  return (
    <div className="fixed bottom-4 right-4 max-w-xs w-full bg-red-600 text-white rounded-lg shadow-lg p-4 flex items-center justify-between transition-opacity duration-300 ease-in-out">
      <button  className="ml-2 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SnackBar;
