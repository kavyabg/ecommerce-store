// backend/controllers/userController.js
const User = require('../models/userModel'); // fix destructure

const getUserByEmail = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email); // decode the encoded email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userData } = user.toObject(); // hide password
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserByEmail,
};
