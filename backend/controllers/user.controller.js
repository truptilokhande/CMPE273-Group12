const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const config = require('../config/config.json')

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Check if all mandatory inputs exists
    if (!name || !email || !password) {
        res.json({
            "status": 400,
            "data": {},
            "message": "Please add all fields"
        })
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.json({
            "status": 400,
            "data": {},
            "message": "User already exists"
        })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.json({
            "status": 201,
            "data": {
                "_id": user.id,
                "name": user.name,
                "email": user.email,
                "token": generateToken(user._id)
            },
            "message": "User registered successfully"
        })
    } else {
        res.json({
            "status": 400,
            "data": {},
            "message": "Invalid user data"
        })
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            "status": 200,
            "data": {
                "_id": user.id,
                "name": user.name,
                "email": user.email,
                "token": generateToken(user._id)
            },
            "message": "User logged in successfully"
        })
    } else {
        res.json({
            "status": 400,
            "data": {},
            "message": "Invalid credentials"
        })
    }
})

// @desc    Get user data
// @route   GET /api/users/getProfile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
    res.json({
        "status": 200,
        "data": req.user,
        "message": "User profile fetched successfully"
    })
})

// @desc    Get all users
// @route   GET /api/users/getAllUsers
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
    res.json({
        "status": 200,
        "data": "",
        "message": "All users fetched successfully"
    })
})

// @desc    Get a specific user
// @route   GET /api/users/getUser
// @access  Public
const getUser = asyncHandler(async (req, res) => {
    res.json({
        "status": 200,
        "data": "",
        "message": "User fetched successfully"
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE_PERIOD,
    })
}

module.exports = {
    register,
    login,
    getProfile,
    getAllUsers,
    getUser
}