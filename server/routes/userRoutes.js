import express from 'express'
import { authUser, getProfile, getUsers, logoutUser, registerUser, updateProfile } from '../controllers/userControllers.js'

const router = express.Router()

router
  .route('/')
  .post(registerUser)
  .get(getUsers)

router
  .route('/auth')
  .post(authUser)

router
  .route('/logout')
  .post(logoutUser)

router
  .route('/profile')
  .get(getProfile)
  .put(updateProfile)

export default router