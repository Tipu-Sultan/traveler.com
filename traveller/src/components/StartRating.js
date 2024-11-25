import React from 'react';

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        // Calculate the conditions for full, half, and empty stars
        if (index < Math.floor(rating)) {
          // Full star
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFD700"
              viewBox="0 0 24 24"
              stroke="#FFD700"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          );
        } else if (index < rating) {
          // Half star
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <defs>
                <linearGradient id={`halfStar-${index}`}>
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="none" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#halfStar-${index})`}
                stroke="#FFD700"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          );
        } else {
          // Empty star
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#D1D5DB"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          );
        }
      })}
    </div>
  );
};

export default StarRating;
