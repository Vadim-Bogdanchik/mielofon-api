import express from 'express'

import {
  getUsersController,
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/userControllers.js'

const router = express.Router()

router.route('/').get(getUsersController).post(createUserController)
router.route('/:id').get(getUserController).put(updateUserController).delete(deleteUserController)

export default router
