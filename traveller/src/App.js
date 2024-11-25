import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Login from './auth/Login';
import Register from './auth/Register';
import PlaceDetails from './pages/PlaceDetails';
import HotelDetails from './pages/HotelDetails';
import BikeRentalDetails from './pages/BikeRentalDetails';
import TripCalculator from './components/TripCalculator';
import PageNotFound from './components/NotFound';
import VerifyEmail from './auth/VerifyEmail';
import ProfilePage from './pages/ProfilePage';
import DestinationPage from './pages/DestinationPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import ThankYou from './pages/ThankYou';
import ForgotPassword from './auth/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ContactUs from './pages/ContactUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<VerifyEmail />} />

        {/* Protected Routes */}
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/checkout/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/thank-you/:bookingId"
          element={
            <ProtectedRoute>
              <ThankYou />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/booking" element={<BookingPage />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/search/place/:packageId" element={<PlaceDetails />} />
        <Route path="/search/rental/:rentalId" element={<BikeRentalDetails />} />
        <Route path="/search/hotel/:hotelId" element={<HotelDetails />} />
        <Route path="/trip-calculator" element={<TripCalculator />} />
        <Route path="/destination" element={<DestinationPage />} />
        <Route path="/contactus" element={<ContactUs />} />


        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
