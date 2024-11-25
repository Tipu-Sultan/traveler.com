// components/PageNotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';

const PageNotFound = () => {
  return (
    <Layout title={'Page not found'}>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-orange-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for doesn't exist. It might have been removed or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="mt-6 inline-block bg-gradient-to-r from-orange-500 to-sky-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Go Back Home
        </Link>
        <div className="mt-4">
          <img 
            src="https://via.placeholder.com/400x300?text=Lost+In+Space" 
            alt="Lost in Space" 
            className="mx-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default PageNotFound;
