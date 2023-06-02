const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const role = user.role
    const isPremium = user.isPremium

    const token = createToken(user._id);

    res.status(200).json({ username, token, role, isPremium })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.signupUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.signup(username, password, role);
    const isPremium = user.isPremium

    const token = createToken(user._id);

    res.status(200).json({ username, token, role, isPremium })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.makePremium = async (req, res) => {
  const { username } = req.params

  try {
    // Melakukan update pada dokumen berdasarkan ID
    const user = await User.findOne({ username });
    if (user) {
      user.isPremium = true;
      const updatedUser = await user.save();
      res.json(updatedUser);
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}