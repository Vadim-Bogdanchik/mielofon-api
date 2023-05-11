import { Response, Request } from 'express'
import AsyncHandler from 'express-async-handler'
import {
  getProjectsService,
  getProjectService,
  createProjectService,
  UpdateProjectService,
  DeleteProjectService,
} from '../services/projectService.js'

//* @desc GET All projects
//* @route GET /api/projects
//* @access public
export const getProjectsController = AsyncHandler(async (req: Request, res: Response) => {
  const projects = await getProjectsService()

  res.status(200).json(projects)
})

//* @desc CREATE project
//* @route POST /api/projects
//* @access private
export const createPojectController = AsyncHandler(async (req: Request, res: Response) => {
  const project = await createProjectService(req.body)

  res.status(200).json(project)
})

//* @desc GET project
//* @route GET /api/projects/:id
//* @access public
export const getProjectController = AsyncHandler(async (req: Request, res: Response) => {
  const project = await getProjectService(req.params.id)

  res.status(200).json(project)
})

//* @desc UPDATE project
//* @route PUT /api/projects/:id
//* @access private
export const updateProjectController = AsyncHandler(async (req: Request, res: Response) => {
  const project = await UpdateProjectService(req.params.id, req.body)

  res.status(200).json(project)
})

//* @desc DELETE project
//* @route DELETE /api/projects/:id
//* @access private
export const deleteProjectController = AsyncHandler(async (req: Request, res: Response) => {
  const project = await DeleteProjectService(req.params.id)

  res.status(200).json({ message: `Проект ${req.params.id} удален`, project: project })
})
