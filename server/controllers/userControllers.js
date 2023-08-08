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
    email: user.email,
    isAdmin: user.isAdmin
  })

})

/**
 * @desc    Auth user/set token 
 * @route   POST /api/v1/users/auth
 * @access  Public
 */
export const authUser = asyncHandler(async (req, res, next) => {

  const { name, password, email } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateJwtToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401)
    throw new Error('Invalid login data')
  }

})

/**
 * @desc    Logout user/destroy token
 * @route   POST /api/v1/users/logout
 * @access  Public
 */
export const logoutUser = asyncHandler(async (req, res, next) => {
  // ustawia pusty `jwt` token oraz zerową datę, celem wyzerowania cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
})

/**
 * @desc    Get user profile
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res, next) => {
  // pobierz dane usera z bazy na podstawie ID
  const user = await User.findById(req.user._id)
  // jeśli jest user
  if (user) {
    const { _id, name, email, isAdmin } = user
    // wyślij dane uzera do klienta
    return res.status(200).json({ _id, name, email, isAdmin })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }
})

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res, next) => {
  // sprawdź czy jest user w bazie na podstawie ID pobranego z middleware
  // obiekt dodany podczas sprawdzenia w metodzie protect
  const user = await User.findById(req.user._id)

  // jeśli jest user
  if (user) {
    // ustaw nowe dane lub wstaw stare
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    // set password only if changed (present in body)
    if (req.body.password) {
      user.password = req.body.password
    }
    // zapisz usera do bazy
    const updatedUser = await user.save()
    // pobierz aktualne dane z nowego uzera
    const { _id, name, email, isAdmin } = updatedUser
    return res.status(200).json({ _id, name, email, isAdmin })
  } else {
    res.status(404)
    throw new ErrorResponse(`User not found`)
  }
})

/**
 * @desc    Get all users
 * @route   GET /api/v1/users/
 * @access  Admin
 */
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({})
  res.status(200).json(users)
})

/**
 * @description Delete user by ID (admin)
 * @route       DELETE /api/users/:id
 * @access      Private/ADMIN
 */
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user
  if (!_id) {
    res.status(404)
    throw new ErrorResponse(`User not found`)
  }
  const deletedUser = await User.findByIdAndDelete({ _id }).select('-password')
  if (!deletedUser) {
    res.status(500)
    throw new ErrorResponse(`User not deleted`)
  }
  res.status(200).json({ message: `User ${deletedUser.name} deleted seccessfully` })
})

/**
 * @description Get user by ID (admin)
 * @route       GET /api/users/:id
 * @access      Private/ADMIN
 */
export const getUserById = asyncHandler(async (req, res, next) => {
  res.status(200).json('get user by id')
})


/**
 * @description Update user by ID (admin)
 * @route       PUT /api/users/:id
 * @access      Private/ADMIN
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  res.status(200).json('update user by id')
})