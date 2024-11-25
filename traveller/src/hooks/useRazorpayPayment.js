// src/hooks/useRazorpayPayment.js
import { useDispatch, useSelector } from 'react-redux';
import { clearbookingDetails, deletePaymentRequest, createPaymentRequest, updateBooking, updatePaymentRequest } from '../redux/slices/bookingSlice';

const useRazorpayPayment = (bookingDetails,setModalVisible) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const localuser = JSON.parse(localStorage.getItem('user'));
  const userData = !user ? localuser : user;


  const handlePaymentSuccess = async (response, order) => {
    const paymentData = {
      order_id: order.id,
      payment_id: response.razorpay_payment_id,
      signature: response.razorpay_signature,
    };

    try {
      const data = await dispatch(updatePaymentRequest(paymentData)).unwrap();
      if (data.success) {
        dispatch(updateBooking({
          bookingId: bookingDetails.bookingId,
          paymentMethod: data?.details?.paymentMethod,
          paymentStatus: 'Completed',
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        }));
        dispatch(clearbookingDetails())
        window.location.assign(`/booking/thank-you/${bookingDetails.bookingId}`);
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Payment verification failed');
    }
  };

  const initiatePayment = async () => {
    try {
      const orderData = {
        amount: bookingDetails.checkoutPrice * 100,
        currency: 'INR',
        receipt: bookingDetails.bookingId,
        packageId: bookingDetails?.packageId,
        userId: userData?._id
      }
      const order = await dispatch(createPaymentRequest(orderData)).unwrap();

      const options = {
        key: process.env.REACT_APP_RazorPay_ID,
        amount: order.amount * 100,
        currency: order.currency,
        name: 'Tipu Sultan',
        description: 'Booking Transaction',
        order_id: order.id,
        handler: (response) => handlePaymentSuccess(response, order),
        prefill: {
          name: bookingDetails.name,
          email: bookingDetails.email,
          contact: bookingDetails.contact,
        },
        theme: {
          color: '#F37254',
        },
        modal: {
          ondismiss: () => {
            setModalVisible(true);  
            try {
              dispatch(deletePaymentRequest(bookingDetails?.bookingId)).unwrap();
            } catch (error) {
              console.error('Error during cancellation:', error);
              alert('Failed to clear payment details.');
            }
          },
        },
      };


      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Something went wrong with the payment process');

    }
  };

  return { initiatePayment };
};

export default useRazorpayPayment;
