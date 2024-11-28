import React, { useState } from 'react';
import useRazorpayPayment from '../hooks/useRazorpayPayment';
import Layout from '../layout/Layout';
import useBookingForm from '../hooks/useBookingForm';
import { useSelector } from 'react-redux';
import DynamicModal from '../components/modals/DynamicModal';

const PaymentPage = () => {
    
  const { bookingDetails} = useBookingForm();
  const {loading} = useSelector((state) => state.booking);
  const [modalVisible, setModalVisible] = useState(false);  

  const { initiatePayment } = useRazorpayPayment(bookingDetails,setModalVisible);


  

  return (
    <Layout title={'Payment || Traveler'}>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <img
                src={'https://travellercom.vercel.app/static/media/logo.10af85ce2e3989e8d87e.jpg'}
                alt="Company Logo"
                className="w-36 h-36 object-contain rounded-full shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
              <p className="text-gray-500">Review your booking and proceed with payment</p>
            </div>

            {/* Right Section */}
            <div className="grid grid-cols-1 gap-6">
              <section className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Package Details</h3>
                <p className="text-gray-700"><strong>Package:</strong> {bookingDetails?.packageName}</p>
                <p className="text-gray-700"><strong>Price:</strong> ₹{bookingDetails?.checkoutPrice}</p>
                <p className="text-gray-700"><strong>Details:</strong> {bookingDetails?.shortDetails}</p>
              </section>

              <section className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Traveler Details</h3>
                <p className="text-gray-700"><strong>Name:</strong> {bookingDetails?.name}</p>
                <p className="text-gray-700"><strong>Email:</strong> {bookingDetails?.email}</p>
                <p className="text-gray-700"><strong>Contact:</strong> {bookingDetails?.contact}</p>
                <p className="text-gray-700"><strong>Gender:</strong> {bookingDetails?.gender}</p>
              </section>
            </div>
          </div>

          {/* Payment Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={initiatePayment}
              className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-orange-500 to-sky-500 text-white rounded-full shadow-lg hover:bg-gradient-to-l transition duration-300"
            >
              {loading === 'createBooking' ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
                </div>
              ) : (
                "Pay with RazorPay"
              )}
            </button>
          </div>
        </div>
      </div>
      <DynamicModal 
        isOpen={modalVisible} 
        onClose={() => setModalVisible(false)} 
        title="Payment Canceled" 
        type={'error'}
        message="Your payment process was canceled. Please try again or contact support."
      />
    </Layout>
  );
};

export default PaymentPage;
