import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const DynamicBreadcrumbs = ({ url }) => {
  // Split the passed URL by '/' and remove any empty segments
  const pathnames = url?.split('/').filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex">
        {/* Home breadcrumb */}
        <li>
          <RouterLink to="/" className="text-blue-500 hover:text-blue-700">
            Home
          </RouterLink>
        </li>
        {/* Loop through each pathname and render breadcrumbs */}
        {pathnames?.map((segment, index) => {
          const to = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {isLast ? (
                // Last segment is plain text (disabled)
                <span className="text-gray-500">{segment.replace(/-/g, ' ')}</span>
              ) : (
                // Other segments are links
                <RouterLink to={to} className="text-blue-500 hover:text-blue-700">
                  {segment.replace(/-/g, ' ')}
                </RouterLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DynamicBreadcrumbs;
