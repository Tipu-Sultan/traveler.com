import api from "../../api/api";

const createBooking = async (bookingData, { rejectWithValue }) => {
    try {
        const response = await api.post(`/booking/create-booking`, bookingData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Booking creation failed');
    }
};

const updateBooking = async (updateData, { rejectWithValue }) => {
    try {
        const response = await api.put(`/booking/update-booking`, updateData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Booking update failed');
    }
};
const getBookingDetails = async (bookingId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/booking/get-booking/${bookingId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Booking retrieval failed');
    }
};

const updatePaymentRequest = async (paymentData, { rejectWithValue }) => {
    try {
        const response = await api.post(`/payment/verify-payment`, paymentData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Booking retrieval failed');
    }
};

const deletePaymentRequest = async (bookingId, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/payment/delete-payment/${bookingId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete payment details');
    }
};


const createPaymentRequest = async (paymentData, { rejectWithValue }) => {
    try {
        const response = await api.post(`/payment/create-payment`, paymentData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Booking retrieval failed');
    }
};



const bookingServices = { createBooking, updateBooking, getBookingDetails, createPaymentRequest, updatePaymentRequest, deletePaymentRequest };
export default bookingServices;
