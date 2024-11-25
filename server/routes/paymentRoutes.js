// routes/authRoutes.js
const express = require('express');
const { PayByRazorpay,VerifyPaymentByRazorpay, deletePaymentStatus } = require('../controllers/PaymentController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-payment',auth, PayByRazorpay);
router.post('/verify-payment',auth, VerifyPaymentByRazorpay);
router.delete('/delete-payment/:bookingId',auth, deletePaymentStatus);




module.exports = router;
