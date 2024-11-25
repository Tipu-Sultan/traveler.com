// routes/authRoutes.js
const express = require('express');
const multer  = require('multer');
const { register, login, verifyEmail, fetchUserData, updateUserProfile, changeOrUpdateProfileImage, sendOtp, resetPassword, googleLogin } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image, video, and audio files are allowed."), false);
    }
  };
  
  const multerStorage = multer.memoryStorage();
  const upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter,
  });
  

router.route('/profile/image').put(auth, upload.fields([{ name: 'profileImage', maxCount: 1 }]), changeOrUpdateProfileImage);
router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/send-otp', sendOtp);
router.post('/reset-password', resetPassword);
router.get('/fetch/:userId',auth, fetchUserData);
router.get('/verify/:token', verifyEmail);
router.put('/users/:userId',auth, updateUserProfile);




module.exports = router;
