// pages/Register.js
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayouts';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch for Redux
import { registerUser } from '../redux/slices/authSlices';
import { enqueueSnackbar } from 'notistack';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch(); 
  const { loading, success } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');

    // Dispatch the registerUser action
    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      enqueueSnackbar(response.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error || 'Something went wrong', { variant: 'error' });
    }
  };

  return (
    <Layout title="Register">
      <AuthLayout title="Register">
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sky-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-1 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
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
            {loading === 'register' ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-center text-sm text-sky-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </AuthLayout>
    </Layout>
  );
};

export default Register;
