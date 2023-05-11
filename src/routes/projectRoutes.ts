import express from 'express'

import {
  getProjectsController,
  createPojectController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from '../controllers/projectControllers.js'

const router = express.Router()

router.route('/').get(getProjectsController).post(createPojectController)
router.route('/:id').get(getProjectController).put(updateProjectController).delete(deleteProjectController)

export default router
