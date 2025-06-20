const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  type: { type: String, enum: ['flight', 'hotel', 'car', 'visa'], required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'refunded'], default: 'confirmed' },
  bookingDate: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Booking', bookingSchema);
