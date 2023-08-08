import express from 'express'
import { authUser, deleteUser, getProfile, getUsers, logoutUser, registerUser, updateProfile } from '../controllers/userControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(registerUser)
  .get(protect, admin, getUsers)

router
  .route('/auth')
  .post(authUser)

router
  .route('/logout')
  .post(logoutUser)

router
  .route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteUser)

export default router