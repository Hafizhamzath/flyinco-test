const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  createBooking,
  getAllUsers,
  getDashboardStats
} = require('../controllers/adminControllers');
const { pushBookingToTraacs } = require('../controllers/traacsController');
const { resetUserOtpLimit } = require('../controllers/adminControllers');




// Booking routes
router.get('/bookings', getAllBookings);
router.post('/bookings', createBooking);

// User management
router.get('/users', getAllUsers);

// Dashboard analytics
router.get('/analytics', getDashboardStats);
router.post('/bookings/:id/push-traacs', pushBookingToTraacs);

//otpreset
router.post('/users/:id/reset-otp', resetUserOtpLimit);


module.exports = router;
