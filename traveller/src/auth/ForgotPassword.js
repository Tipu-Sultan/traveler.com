import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { enqueueSnackbar } from 'notistack';
import AuthLayout from '../components/AuthLayouts';
import { resetPassword, sendOtp, setStep } from '../redux/slices/authSlices';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, step } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    try {
      const res = await dispatch(sendOtp({ email })).unwrap();
      enqueueSnackbar(res.message || 'OTP sent to your email', { variant: 'success' });
      dispatch(setStep(2)); // Update step to 2
    } catch (err) {
      enqueueSnackbar(err || 'Something went wrong', { variant: 'error' });
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      const res = await dispatch(resetPassword({ otp, password })).unwrap();
      enqueueSnackbar(res.message || 'Password reset successful', { variant: 'success' });
      navigate('/login'); 
    } catch (err) {
      enqueueSnackbar(err || 'Something went wrong', { variant: 'error' });
    }
  };

  return (
    <Layout title="Forgot Password">
      <AuthLayout title="Forgot Password">
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sky-600">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading === 'sendOtp'}
              className="block w-full bg-gradient-to-r from-orange-500 to-sky-500 text-white font-semibold text-center py-2 rounded-md hover:bg-gradient-to-l transition duration-300"
            >
              {loading === 'sendOtp' ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
                </div>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sky-600">OTP</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                className="w-full px-4 py-2 mt-1 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-sky-600">New Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 mt-1 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordVisible ? '🙈' : '👁️'}
              </span>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-sky-600">Confirm Password</label>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 mt-1 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {confirmPasswordVisible ? '🙈' : '👁️'}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading === 'resetPassword'}
              className="block w-full bg-gradient-to-r from-orange-500 to-sky-500 text-white font-semibold text-center py-2 rounded-md hover:bg-gradient-to-l transition duration-300"
            >
              {loading === 'resetPassword' ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}

        <hr className="my-4" />
        <p className="text-center text-sm text-sky-600 mt-4">
          Remember your password?{' '}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </AuthLayout>
    </Layout>
  );
};

export default ForgotPassword;
