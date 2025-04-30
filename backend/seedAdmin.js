// seedAdmin.js
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const { User } = require('./models/userModel');

dotenv.config(); 

const createAdmin = async () => {
  try {
    await connectDB(); // Connect using shared DB function

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      username: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    mongoose.connection.close(); // Ensure connection is closed after script
  }
};

createAdmin();
