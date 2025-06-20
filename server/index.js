const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
require('./cron/resetOtpLimit');


dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on https://localhost:${PORT}`));
