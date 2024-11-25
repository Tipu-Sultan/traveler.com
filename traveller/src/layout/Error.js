import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Error = ({ error }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center  bg-red-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center border border-red-300 animate-slide-in">
                <ExclamationCircleIcon className="h-16 w-16 text-red-500 mb-4 animate-pulse" />
                <h2 className="font-bold text-2xl text-red-600 mb-2">Oops! Something went wrong.</h2>
                <p className="text-gray-700 mb-4">{error || 'We couldn’t find the place you’re looking for.'}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                    Go Back
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="mt-2 px-4 py-2 text-red-500 bg-transparent border border-red-500 rounded-lg hover:bg-red-50 transition-colors duration-300"
                >
                    Home Page
                </button>
            </div>
        </div>
    );
};

export default Error;
