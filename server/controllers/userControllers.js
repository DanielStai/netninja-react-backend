const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register a user
// @route /api/users/
// @access public
const registerUser = asyncHandler(async(req, res) => {
    res.send('Register User')
})


// @desc login a user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async(req, res) => {
    res.send('Login a user')
})


// @desc Post a blog
// @route /api/users/me
// @access private
const getThisUser = asyncHandler(async(req, res) => {
    res.send('Get my details')
})


module.exports = {
    registerUser,
    loginUser,
    getThisUser
}