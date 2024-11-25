const express = require('express');
const { createBooking, updateBookingAfterPayment, getBookingDetails } = require('../controllers/BookingController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-booking',auth, createBooking);
router.put('/update-booking',auth, updateBookingAfterPayment);
router.get('/get-booking/:bookingId',auth,getBookingDetails);




module.exports = router;
