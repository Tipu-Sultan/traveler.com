const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendVerificationEmail = require('../helper/sendEmail');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Payment = require('../models/PaymentModel');
const Booking = require('../models/Booking');
const { sendOtpToEmail } = require('../helper/sendEmail');
const { OAuth2Client } = require('google-auth-library');
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.MY_CLOUD_NAME,
  api_key: process.env.MY_API_KEY,
  api_secret: process.env.MY_API_SECRET
});

const MAX_ATTEMPTS = 3; 


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate a verification token manually (this can be any unique string)
    const verificationToken = crypto.randomBytes(16).toString('hex');

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Create a new user instance
    const user = new User({ name, email, password, token: verificationToken });
    await user.save();

    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Check if the user is locked due to too many failed attempts
    if (user.loginAttempts >= MAX_ATTEMPTS && !user.isVerified) {
      return res.status(403).json({
        error: "Account locked due to multiple failed login attempts. Please contact support.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Increment loginAttempts
      user.loginAttempts += 1;

      // Lock account if loginAttempts exceed maximum attempts
      if (user.loginAttempts >= MAX_ATTEMPTS) {
        user.isVerified = false;
      }

      await user.save();

      const remainingAttempts = Math.max(0, MAX_ATTEMPTS - user.loginAttempts);
      return res.status(400).json({
        error: `Invalid email or password. You have ${remainingAttempts} remaining attempt(s).`,
      });
    }

    // Reset loginAttempts on successful login
    user.loginAttempts = 0;
    await user.save();

    // Fetch associated payment and booking data
    const packageData = await getPackageData(user._id);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });

    // Send response with token, user data, payment data, and booking data
    res.json({
      token,
      user,
      packageData,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        profileImage: picture,
        isVerified: true,
        password: 'null',
      });

      await user.save();
    }

    // Fetch associated payment and booking data
    const packageData = await getPackageData(user._id);

    // Generate JWT token for the user
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
      },
      packageData,
      token: accessToken,
    });
  } catch (error) {
    console.error('Google Login Error:', error.message);
    res.status(500).json({ success: false, message: 'Google login failed', error: error.message });
  }
};


const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Attempt to send the OTP via email (example using a sendOtpToEmail function)
    const emailSent = await sendOtpToEmail(email, otp);

    if (emailSent) {
      // If email is sent successfully, update OTP and expiration in the database
      user.otp = otp;
      user.isOtpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
      await user.save();

      return res.status(200).json({ message: 'OTP sent successfully to your email' });
    } else {
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  const { otp, password } = req.body;

  try {
    // Find the user by OTP
    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired OTP' });
    }

    // Verify OTP expiration
    if (Date.now() > new Date(user.isOtpExpires)) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Update the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.otp = null; // Clear OTP
    user.isOtpExpires = null; // Clear OTP expiration

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};


const fetchUserData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user by userId
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Fetch associated booking and payment data
    const packageData = await getPackageData(userId);

    // Send the combined response with user and package data
    res.json({
      user,
      packageData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data', details: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Find user by verification token
    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Update user to verified
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: 'Email verification failed' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, contact, gender } = req.body;

    // Update the user data
    const user = await User.findByIdAndUpdate(
      userId,
      { name, contact, gender },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Send response with updated user data and combined booking and payment data
    res.json({
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const changeOrUpdateProfileImage = async (req, res) => {
  try {
    // Find the user using req.user.id (which comes from the decoded JWT token)
    const user = await User.findById(req.user.id); // Use req.user.id to find the user
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const profileImage = req.files && req.files['profileImage'] ? req.files['profileImage'][0] : null;

    if (profileImage) {
      // Check if the user already has a profile image
      if (user.profileImage) {
        // Extract public_id from the existing profile image URL in Cloudinary
        const public_id = user.profileImage.split('/').slice(-1)[0].split('.')[0];

        // Delete the old profile image from Cloudinary
        cloudinary.uploader.destroy(public_id, async (error, result) => {
          if (error) {
            console.error('Error deleting file from Cloudinary:', error);
            return res.status(500).json({ error: 'Error deleting file from Cloudinary.' });
          }

          // If deletion is successful, proceed to upload the new image
          cloudinary.uploader.upload_stream({ resource_type: "image" }, async (error, result) => {
            if (error) {
              console.error('Error uploading file to Cloudinary:', error);
              return res.status(500).json({ error: 'Error uploading file to Cloudinary.' });
            }

            // Update the user with the new profile image URL
            user.profileImage = result.secure_url;
            await user.save();

            // Send back the response with the updated user data
            res.status(200).json({
              _id: user._id,
              profileImage: user.profileImage,
              message: "User profile image updated successfully"
            });
          }).end(profileImage.buffer);
        });
      } else {
        // No existing profile image, directly upload the new one
        cloudinary.uploader.upload_stream({ resource_type: "image" }, async (error, result) => {
          if (error) {
            console.error('Error uploading file to Cloudinary:', error);
            return res.status(500).json({ error: 'Error uploading file to Cloudinary.' });
          }

          // Update the user with the new profile image URL
          user.profileImage = result.secure_url;
          await user.save();

          // Send back the response with the updated user data
          res.status(200).json({
            _id: user._id,
            profileImage: user.profileImage,
            message: "User profile image updated successfully"
          });
        }).end(profileImage.buffer);
      }
    } else {
      return res.status(400).json({ success: false, message: 'No profile image uploaded' });
    }
  } catch (error) {
    console.error('Error in changeOrUpdateProfileImage:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const getPackageData = async (userId) => {
  // Fetch associated booking data
  const bookings = await Booking.find({ user: userId })
    .select('package startPoint endPoint bookingId bookingDate travelDate numberOfPeople numberOfRooms hotelName commuteType bookingStatus')
    .exec();

  // Fetch associated payment data
  const payments = await Payment.find({ userId })
    .select('orderId paymentId method currency amount status bookingId')
    .exec();

  // Combine the booking and payment data
  const packageData = bookings.map((booking) => {
    const payment = payments.find((payment) => payment.bookingId === booking.bookingId);
    return {
      package: booking.package,
      bookingId: booking.bookingId,
      startPoint: booking.startPoint,
      endPoint: booking.endPoint,
      bookingDate: booking.bookingDate,
      travelDate: booking.travelDate,
      numberOfPeople: booking.numberOfPeople,
      numberOfRooms: booking.numberOfRooms,
      hotelName: booking.hotelName,
      commuteType: booking.commuteType,
      bookingStatus: booking.bookingStatus,
      payment: payment
        ? {
            orderId: payment.orderId,
            paymentId: payment.paymentId,
            method: payment.method,
            currency: payment.currency,
            amount: payment.amount,
            status: payment.status,
          }
        : null,
    };
  });

  return packageData;
};



module.exports = { register, login, googleLogin, verifyEmail, fetchUserData, updateUserProfile, changeOrUpdateProfileImage, sendOtp, resetPassword };
