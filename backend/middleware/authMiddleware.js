const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const config = require('../config/config.json');

const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.json({
        "status": 401,
        "data": {},
        "message": error
    })
    }
  }

  if (!token) {
    res.json({
        "status": 401,
        "data": {},
        "message": "Not authorized, no token"
    })
  }
})

module.exports = { authenticateUser }