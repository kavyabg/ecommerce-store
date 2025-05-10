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
    const user = await User.findOne({ email });
        if (!user) {
      return res.status(401).json({ message: "User doesn't exist with that email" });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
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
  try {
    const { token } = req.params; // Token from the URL
    const { password } = req.body; // New password

    console.log('Received token:', token);

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Hash the reset token to compare it with the stored hashed token in the DB
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    console.log('Hashed token from URL:', hashedToken);

    // Find the user with the hashed token and check if the token has expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Expiry check
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    console.log('Stored token in DB:', user.resetPasswordToken);
    console.log('Token expiration time:', user.resetPasswordExpire);
    console.log('Current time:', Date.now());

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token and expiration
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
