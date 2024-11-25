// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String }, 
  gender: { type: String, enum: ['Male', 'Female', 'Other'] }, // User's gender
  profileImage:{ type: String},
  isVerified: { type: Boolean, default: false }, // Verification status
  loginAttempts: { type: Number, default:0},
  recentVisits: [
    { 
      packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'package' }, 
      visitedAt: { type: Date, default: Date.now },
      status: { type: String, enum: ['Confirmed', 'Completed', 'Cancelled'], default: 'Confirmed' }
    }
  ],
  totalExpense: { type: Number, default: 0 }, 
  token: { type: String },
  otp: { type: String},
  isOtpExpires: { type: String}
});

// Hash password before saving or updating user
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Ensure the password is hashed before saving the user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt); 
  next();
});






module.exports = mongoose.model('User', userSchema);
