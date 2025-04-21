const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel'); // Ensure path is correct and file uses CommonJS

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const register = async (req, res) => {
  const {  username, email, phone, password } = req.body; // Updated to include new fields

  try {
    // Check if user already exists based on email, username, or phone
    const userExists = await User.findOne({ $or: [{ email }, { username }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with that email, username, or phone' });
    }

    // Create new user with the provided details
    const user = await User.create({
      username,
      email,
      phone,
      password,
    });

    // Return the response with the user's data and JWT token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id), // JWT token generation
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body; // Login still uses email and password

  try {
    // Find the user based on email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user data and JWT token if credentials are valid
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  register,
  login,
};
