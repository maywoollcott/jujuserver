const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

//register user and get token
const createUser = async (req, res) => {
  const existingUser = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (existingUser) {
    return res
      .status(409)
      .send(
        'That phone number is already in use. Please sign in instead of registering.'
      );
  }

  try {
    const hashed = await bcrypt.hash(req.body.password, 15);
    const newUser = new User({
      ...req.body,
      password: hashed,
      dateJoined: Date.now(),
    });
    const user = await newUser.save();
    const authToken = jwt.sign(user.id, JWT_SECRET);
    return res.status(200).send({ user, authToken });
  } catch (error) {
    res.status(500).send('Server error. Please check your internet connection');
  }
};

//login user with token
const logInUser = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    let user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return res
        .status(409)
        .send('No user found for that phone number. Please register.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Incorrect password. Please try again.');
    }

    const authToken = jwt.sign(user.id, JWT_SECRET);
    return res.status(200).send({ user, authToken });
  } catch (err) {
    res
      .status(500)
      .send('Server error. Please check your internet connection.');
  }
};

//get user info by token
const getUserByToken = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user });
    if (!user) {
      return res
        .status(409)
        .send('Cannot find user. Please try logging in again.');
    }

    return res.status(200).send({ user });
  } catch (err) {
    res
      .status(500)
      .send('Server error. Please check your internet connection.');
  }
};

module.exports = { createUser, logInUser, getUserByToken };
