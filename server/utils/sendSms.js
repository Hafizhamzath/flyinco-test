const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendOtpSms(to, otpCode) {
  try {
    const message = await client.messages.create({
      body: `Your Flyinco login OTP is: ${otpCode}`,
      from: process.env.TWILIO_PHONE,
      to
    });

    console.log('✅ SMS SENT:', {
      sid: message.sid,
      to: message.to,
      status: message.status,
      body: message.body
    });

    return message;
  } catch (err) {
    console.error('❌ Twilio SMS ERROR:', err.message);
    throw err;
  }
}

module.exports = sendOtpSms;
