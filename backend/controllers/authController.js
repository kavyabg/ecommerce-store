import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'No user found with that email' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // Send email (basic nodemailer example)
  const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       
      pass: process.env.EMAIL_PASS,
    },
   });
  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset</p><a href="${resetUrl}">Click here</a>`,
  });

  res.json({ message: 'Password reset email sent. Check your inbox' });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
