import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../components/AuthLayouts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, googleLogin, setLoadingState } from '../redux/slices/authSlices'; // Assuming googleLogin is defined in authSlices
import Layout from '../layout/Layout';
import { enqueueSnackbar } from 'notistack';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') ? decodeURIComponent(searchParams.get('redirect')) : '/';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Handle input change for manual login
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle manual login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const res = await dispatch(login(formData)).unwrap();
      enqueueSnackbar(res.message, { variant: 'success' });
      navigate(redirectUrl);
    } catch (err) {
      enqueueSnackbar(err || 'Something went wrong', { variant: 'error' });
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await dispatch(googleLogin({ token: credential })).unwrap();
      enqueueSnackbar(res.message, { variant: 'success' });
      navigate(redirectUrl);
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err || 'Something went wrong', { variant: 'error' });
    }
  };


  // Handle Google login failure
  const handleGoogleFailure = (error) => {
    enqueueSnackbar('Google Sign-In failed. Please try again.', { variant: 'error' });
    console.error('Google Sign-In Error:', error);
  };



  return (
    <Layout title="Login">
      <AuthLayout title="Login">
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Google Login Button */}
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          buttonText="Login"
        />

        {loading === 'googleLogin' && (
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Manual Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-sky-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sky-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-gradient-to-r from-orange-500 to-sky-500 text-white font-semibold text-center py-2 rounded-md hover:bg-gradient-to-l transition duration-300"
          >
            {loading === 'login' ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
              </div>
            ) : (
              'Login'
            )}
          </button>
          <p className="text-center text-sm text-sky-600 mt-4">
            Don’t have an account?{' '}
            <Link
              to={redirectUrl ? '/register?redirect=' + redirectUrl : '/register'}
              className="text-orange-500 hover:underline"
            >
              Register
            </Link>
          </p>
          <p className="text-center text-sm text-sky-600 mt-4">
            <Link to="/forgot-password" className="text-orange-500 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </form>
      </AuthLayout>
    </Layout>
  );
};

export default Login;
