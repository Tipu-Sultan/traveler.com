import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { verifyEmail } from '../redux/slices/authSlices';
import Layout from '../layout/Layout';

const VerifyEmail = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (token) {
            dispatch(verifyEmail(token));
        }
    }, [dispatch, token]);

    const { loading, error, message } = useSelector((state) => state.auth);

    return (
        <Layout title={'Verifications'}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">Verify Your Email</h2>

                {loading ? (
                    <p className="text-center text-blue-500 animate-pulse">Verifying your email, please wait...</p>
                ) : (
                    <>
                        <p className={`text-center mt-4 ${error ? 'text-red-500' : 'text-green-500'}`}>
                            {message && message}
                        </p>
                    </>


                )}

                {!error && (
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="inline-block px-6 py-2 text-white bg-gray-600 rounded-full hover:bg-gray-700 transition"
                        >
                            Go Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
        </Layout>
    );
};

export default VerifyEmail;
