import { Response, Request } from 'express'
import AsyncHandler from 'express-async-handler'
import {
  getUsersService,
  getUserService,
  createUserService,
  updateUserService,
  deleteUserService,
} from '../services/userService.js'

//* @desc GET All users
//* @route GET /api/users
//* @access public
export const getUsersController = AsyncHandler(async (req: Request, res: Response) => {
  const users = await getUsersService()

  res.status(200).json(users)
})

//* @desc CREATE user
//* @route POST /api/users
//* @access private
export const createUserController = AsyncHandler(async (req: Request, res: Response) => {
  const user = await createUserService(req.body)

  res.status(200).json(user)
})

//* @desc GET user
//* @route GET /api/users/:id
//* @access public
export const getUserController = AsyncHandler(async (req: Request, res: Response) => {
  const user = await getUserService(req.params.id)

  res.status(200).json(user)
})

//* @desc UPDATE user
//* @route PUT /api/users/:id
//* @access private
export const updateUserController = AsyncHandler(async (req: Request, res: Response) => {
  const user = await updateUserService(req.params.id, req.body)

  res.status(200).json(user)
})

//* @desc DELETE user
//* @route DELETE /api/users/:id
//* @access private
export const deleteUserController = AsyncHandler(async (req: Request, res: Response) => {
  const user = await deleteUserService(req.params.id)

  res.status(200).json({ message: `Пользователь ${req.params.id} удален`, project: user })
})
