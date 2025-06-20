const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  code: String,
  expiresAt: Date,
  lastSentAt: Date,          // ⏱️ For 60-second cooldown
  count: {                   // 🔁 Track number of sends today
    type: Number,
    default: 0
  },
  date: String               // 📅 YYYY-MM-DD for daily tracking
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, required: true },
  password: String,
  role: { type: String, enum: ['admin', 'corporate', 'staff'], default: 'staff' },
  isVerified: { type: Boolean, default: false },
  otp: otpSchema
});

module.exports = mongoose.model('User', userSchema);
