import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaCalculator, FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.jpg';
import { logout } from '../redux/slices/authSlices';
import useAuthData from '../hooks/useAuthData';
import { googleLogout } from '@react-oauth/google';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout());
    googleLogout();
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };
  const { userData,isAuthenticated } = useAuthData();

  return (
    <nav className="bg-gradient-to-r  from-orange-500 to-sky-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Traveller Logo" className="h-11 w-auto rounded-lg" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 text-white">
              <li className="flex items-center space-x-1">
                <FaHome />
                <Link to="/" className="hover:text-blue-200">Home</Link>
              </li>
              <li className="flex items-center space-x-1">
                <FaMapMarkerAlt />
                <Link to="/destination" className="hover:text-blue-200">Destinations</Link>
              </li>
              <li className="flex items-center space-x-1">
                <FaCalculator />
                <Link to="/trip-calculator" className="hover:text-blue-200">Trip Calculator</Link>
              </li>
              <li className="flex items-center space-x-1">
                <FaMapMarkerAlt />
                <Link to="/contactus" className="hover:text-blue-200">ContactUs</Link>
              </li>
            </ul>
            <div className="flex space-x-4 items-center">
              {isAuthenticated ? (
                <>
                  <div className="relative">
                    <button onClick={toggleProfileDropdown} className="text-white flex items-center space-x-1">
                      {/* Display the user's profile image */}
                      <img
                        src={userData?.profileImage}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>Profile</span>
                    </button>

                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <Link to={`/profile/${userData && userData?.name}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                  <Link to="/register" className="flex items-center space-x-1 bg-white text-orange-500 px-3 py-2 rounded hover:bg-gray-200">
                    <FaUserPlus />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center space-y-4 text-white mt-4">
              <li>
                <Link to="/" onClick={toggleMobileMenu} className="flex items-center space-x-1">
                  <FaHome />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/destination" onClick={toggleMobileMenu} className="flex items-center space-x-1">
                  <FaMapMarkerAlt />
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link to="/trip-calculator" onClick={toggleMobileMenu} className="flex items-center space-x-1">
                  <FaCalculator />
                  <span>Trip Calculator</span>
                </Link>
                <li className="flex items-center space-x-1">
                <FaMapMarkerAlt />
                <Link to="/contactus" className="hover:text-blue-200">ContactUs</Link>
              </li>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to={`/profile/${userData && userData.name}`} onClick={toggleMobileMenu} className="flex items-center space-x-1">
                      {/* Display the user's profile image */}
                      <img
                        src={userData?.profileImage}
                        alt="User Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>Profile</span>
                    </Link>

                  </li>
                  <li>
                    <Link to="/settings" onClick={toggleMobileMenu} className="flex items-center space-x-1">
                      <FaCog />
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="flex items-center space-x-1 text-red-500">
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={toggleMobileMenu} className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                      <FaSignInAlt />
                      <span>Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={toggleMobileMenu} className="flex items-center space-x-1 bg-white text-orange-500 px-3 py-2 rounded hover:bg-gray-200">
                      <FaUserPlus />
                      <span>Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
