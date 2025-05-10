import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
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
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <tr>
        <td style="padding: 30px; text-align: center;">
          <h2 style="color: #d63384;">Reset Your Password</h2>
          <p style="font-size: 16px; color: #333;">
            We received a request to reset your password. Click the button below to set up a new one.
          </p>
          <a href="${resetUrl}" style="display: inline-block; margin-top: 20px; background-color: #d63384; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Reset Password
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #777;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999;">
            Need help? Contact our support team at <a href="mailto:support@blossombeauty.com" style="color: #d63384;">support@blossombeauty.com</a>.
          </p>
        </td>
      </tr>
    </table>
  </div>
`,
  });

  res.json({ message: 'Password reset email sent. Check your inbox' });
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // Token from the URL
    const { password } = req.body; // New password

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Hash the reset token to compare with DB
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching hashed token and check expiration
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // ✅ Set new password directly — let the pre-save hook hash it
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
