const cron = require('node-cron');
const User = require('../models/User');

// Run every day at 11:59:59 PM
cron.schedule('59 59 23 * * *', async () => {
  try {
    const result = await User.updateMany(
      { 'otp.count': { $gt: 0 } },
      {
        $set: {
          'otp.count': 0,
          'otp.date': null,
          'otp.lastSentAt': null
        }
      }
    );

    console.log(`✅ OTP reset cron: ${result.modifiedCount} users updated.`);
  } catch (err) {
    console.error('❌ Cron OTP reset error:', err.message);
  }
});
