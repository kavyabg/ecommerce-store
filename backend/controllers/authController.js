import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js'; 

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const register = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with that email, username, or phone' });
    }

    const user = await User.create({ username, email, phone, password });

    res.status(201).json({
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // Send response with user data and JWT token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
