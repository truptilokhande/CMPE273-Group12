const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const config = require("../config/config.json");
const userProfileDefaultImages = [
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/261f4d1183a2a7cfd3927ca3e7895bc9.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/28a48027ee89f30d8681f415ea164f70.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/aaeb0451b1f430b5c177aa1f5f3ea8f4.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/f056a82f02a580b04febfb36b0ccefc4.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/fd1092142390701a6e86fa5ca1282465.png",
];

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all mandatory inputs exists
  if (!name || !email || !password) {
    res.json({
      status: 400,
      data: {},
      message: "Please add all fields",
    });
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.json({
      status: 400,
      data: {},
      message: "User already exists",
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profilepicture: userProfileDefaultImages[Math.floor(Math.random() * 5 + 1)],
  });

  if (user) {
    res.json({
      status: 201,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
      message: "User registered successfully",
    });
  } else {
    res.json({
      status: 400,
      data: {},
      message: "Invalid user data",
    });
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      status: 200,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        profilepicture: user.profilepicture,
      },
      message: "User logged in successfully",
    });
  } else {
    res.json({
      status: 400,
      data: {},
      message: "Invalid credentials",
    });
  }
});

// TODO
const signout = (req, res) => {
  res.json({
    status: 200,
    message: "User logged out successfully",
  });
};

// @desc    Get user data
// @route   GET /api/users/getProfile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  res.json({
    status: 200,
    data: req.user,
    message: "User profile fetched successfully",
  });
});

// @desc    Get all users
// @route   GET /api/users/getAllUsers
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    users && res.status(200).send({ success: "true", data: users });
    !users &&
      res
        .status(400)
        .send({ success: "false", message: "error fetching users" });
  } catch (err) {
    res.status(400).send({ success: "false", message: "error fetching users" });
  }
});

// @desc    Get a specific user
// @route   GET /api/users/getUser
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  res.json({
    status: 200,
    data: "",
    message: "User fetched successfully",
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE_PERIOD,
  });
};

module.exports = {
  register,
  login,
  getProfile,
  getAllUsers,
  getUser,
  signout,
};
