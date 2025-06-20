const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { canSendOtp, generateAndSendOtp } = require('../utils/otpHelper');

// ✅ Register user
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashed,
      role: role || 'staff',
      isVerified: false
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Login + send OTP
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid password' });

    const check = await canSendOtp(user);
    if (!check.allowed) return res.status(429).json({ msg: check.reason });

    await generateAndSendOtp(user);
    res.json({ msg: 'OTP sent to registered phone number' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp) return res.status(400).json({ msg: 'OTP not generated' });

    const { code: storedCode, expiresAt } = user.otp;
    if (storedCode !== code || new Date() > new Date(expiresAt)) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ msg: 'Login successful', name: user.name, role: user.role });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Resend OTP
exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const check = await canSendOtp(user);
    if (!check.allowed) return res.status(429).json({ msg: check.reason });

    await generateAndSendOtp(user);
    res.json({ msg: 'OTP resent successfully' });
  } catch (err) {
    console.error('Resend OTP error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Get session
exports.me = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No session' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch {
    res.status(403).json({ msg: 'Invalid or expired session' });
  }
};

// ✅ Logout
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.json({ msg: 'Logged out' });
};
