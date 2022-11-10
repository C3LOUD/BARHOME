const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const avatar = req.publicId;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPw, name, avatar });
    const result = await user.save();
    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password.');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.JWT_SECRECT,
      { expiresIn: '1h' }
    );
    const expirationTime = new Date().getTime() + 3600000;

    res.status(200).json({
      token,
      expirationTime,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const imgUrl = req.imgUrl ? req.imgUrl : null;
    res
      .status(200)
      .json({ imgUrl, name: req.user.name, saved: req.user.saved });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};