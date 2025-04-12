const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Connect DB & Start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
