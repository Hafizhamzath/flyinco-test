const cryptoRandomString = require('crypto-random-string').default;

const sendOtpSms = require('../utils/sendSms');

async function canSendOtp(user) {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  // Safe fallback if OTP object doesn't exist
  const otp = user.otp || {};

  if (otp.date === today) {
    if (otp.count >= 3) {
      console.log("⛔ OTP limit hit for", user.email);
      return { allowed: false, reason: 'OTP limit exceeded for today' };
    }
  }

  const lastSent = otp.lastSentAt ? new Date(otp.lastSentAt) : null;
  if (lastSent && now - lastSent < 60 * 1000) {
    const wait = 60 - Math.floor((now - lastSent) / 1000);
    console.log(`⏱️ Cooldown active for ${user.email}: wait ${wait}s`);
    return { allowed: false, reason: `Please wait ${wait} seconds before retrying` };
  }

  return { allowed: true };
}

async function generateAndSendOtp(user) {
  const otpCode = cryptoRandomString({ length: 6, type: 'numeric' });
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  // Set OTP fields
  user.otp = {
    code: otpCode,
    expiresAt: new Date(now.getTime() + 5 * 60 * 1000),
    lastSentAt: now,
    count: user.otp?.date === today ? (user.otp.count || 0) + 1 : 1,
    date: today
  };

  await user.save();

  console.log(`📨 Sending OTP ${otpCode} to ${user.phone}`);

  try {
    await sendOtpSms(user.phone, otpCode);
    console.log(`✅ OTP sent to ${user.phone}`);
  } catch (err) {
    console.error(`❌ Failed to send OTP to ${user.phone}:`, err.message);
    throw err;
  }
}

module.exports = { canSendOtp, generateAndSendOtp };
