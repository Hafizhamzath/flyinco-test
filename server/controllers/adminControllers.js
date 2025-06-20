const Booking = require('../models/Booking');
const User = require('../models/User');

// Get all bookings (with filters)
exports.getAllBookings = async (req, res) => {
  const { type, status } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;

  const bookings = await Booking.find(filter).populate('client', 'name email role');
  res.json(bookings);
};

// Create a booking manually (for testing / admin override)
exports.createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  const saved = await newBooking.save();
  res.status(201).json(saved);
};

// Get user list
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Analytics summary
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalBookings,
      totalRevenue,
      bookingsByType,
      totalSynced,
      totalUnsynced,
      revenueByType
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Booking.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }]),
      Booking.countDocuments({ isSynced: true }),
      Booking.countDocuments({ isSynced: false }),
      Booking.aggregate([
        { $group: { _id: "$type", revenue: { $sum: "$totalAmount" } } }
      ])
    ]);

    res.json({
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      bookingsByType,
      totalSynced,
      totalUnsynced,
      revenueByType
    });
  } catch (err) {
    console.error("📊 Analytics error:", err.message);
    res.status(500).json({ msg: "Analytics failed" });
  }
};


//otp reset
exports.resetUserOtpLimit = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.otp = {
      code: null,
      expiresAt: null,
      lastSentAt: null,
      count: 0,
      date: null
    };

    await user.save();
    res.json({ msg: `OTP limit reset for ${user.email}` });
  } catch (err) {
    console.error('Reset OTP error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

