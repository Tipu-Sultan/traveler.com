import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';

const DynamicBreadcrumbs = () => {
  const location = useLocation();

  // Split the pathname and filter out empty segments
  const pathnames = location.pathname
    .split('/')
    .filter((x) => x);

  // Mapping for URL segments to human-readable names
  const breadcrumbNameMap = {
    home: 'Home',
    profile: 'Profile',
    booking: 'booking',
    Thankyou:'thank-you',
    search: 'Search',
    place: 'Place',
    hotels: 'Hotels',
    rentals: 'Nearby Rentals',
    about: 'About Us',
    services: 'Our Services',
    contact: 'Contact Us',
    // Add more mappings as needed
  };

  // Helper function to determine if a segment is likely a parameter
  const isParameter = (segment) => /^[a-zA-Z0-9-_]+$/.test(segment) && !breadcrumbNameMap[segment];

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex">
        <li>
          <RouterLink to="/" className="text-blue-500 hover:text-blue-700">
            Home
          </RouterLink>
        </li>
        {pathnames.map((value, index) => {
          if (isParameter(value)) return null; // Skip parameters

          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          // Convert URL segment to human-readable name or default to the capitalized value
          const name = breadcrumbNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

          // Render last breadcrumb as plain text
          if (isLast) {
            return (
              <li key={to} className="flex items-center">
                <span className="mx-2 text-gray-500">/</span>
                <span className="font-semibold text-gray-800">{name}</span>
              </li>
            );
          }

          // Render other segments as links
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              <RouterLink to={to} className="text-blue-500 hover:text-blue-700">
                {name}
              </RouterLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DynamicBreadcrumbs;
