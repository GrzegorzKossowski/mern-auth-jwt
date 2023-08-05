// removes need for try-catch block
import { asyncHandler } from '../middleware/asyncHandler.js'
import User from '../model/User.js'
import { generateJwtToken } from '../utils/generateJwtToken.js'

/**
 * @desc    Register a new user
 * @route   POST /api/v1/users/
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body

  const userExists = await User.findOne({ email }).select('-password')
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password
  })
  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  generateJwtToken(res, user._id)
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email
  })

})

/**
 * @desc    Auth user/set token 
 * @route   POST /api/v1/users/auth
 * @access  Public
 */
export const authUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: 'AUTH user' })
})

/**
 * @desc    Logout user/destroy token
 * @route   POST /api/v1/users/logout
 * @access  Public
 */
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: 'LOGOUT user' })
})

/**
 * @desc    Get user profile
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: 'GET profile' })
})

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: 'UPDATE profile' })
})

/**
 * @desc    Get all users
 * @route   GET /api/v1/users/
 * @access  Admin
 */
export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: 'GET users' })
})