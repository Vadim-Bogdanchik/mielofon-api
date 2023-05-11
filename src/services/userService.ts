import UserModel from '../models/userModel.js'
import { IUser } from '../types/userTypes.js'
import { checkIsValidObjectId } from '../database/db.js'
import { SanitazeUser } from '../utils/userSanitizer.js'

//* @desc GET All users
//* @route GET /api/users
//* @access public
export const getUsersService = async (): Promise<IUser[]> => {
  try {
    const users = await UserModel.find()
    if (!users) {
      throw new Error('Пользователи не найдены')
    }
    return users
  } catch (err) {
    throw new Error('Пользователи не найдены')
  }
}

//* @desc GET user
//* @route GET /api/users/:id
//* @access public
export const getUserService = async (userId: string): Promise<IUser> => {
  checkIsValidObjectId(userId)

  try {
    const newUser = await UserModel.findById(userId)
    if (!newUser) {
      throw new Error('Пользователь не найден')
    }
    return newUser
  } catch (error) {
    throw new Error('Пользователь не найден')
  }
}

//* @desc CREATE user
//* @route POST /api/users
//* @access private
export const createUserService = async (user: IUser): Promise<IUser> => {
  const sanitazedUser = await SanitazeUser(user)

  try {
    const newUser = await UserModel.create(sanitazedUser)
    if (!newUser) {
      throw new Error('Пользователь не создан')
    }
    return newUser
  } catch (error) {
    throw new Error('Ошибка при создании пользователя')
  }
}

//* @desc Login user
//* @route POST /api/users/login
//* @access private
export const loginUserService = async (user: IUser): Promise<IUser> => {
  const sanitazedUser = await SanitazeUser(user)

  try {
    const newUser = await UserModel.create(sanitazedUser)
    if (!newUser) {
      throw new Error('Пользователь не создан')
    }
    return newUser
  } catch (error) {
    throw new Error('Ошибка при создании пользователя')
  }
}

//* @desc UPDATE user
//* @route PUT /api/users/:id
//* @access private
export const updateUserService = async (userId: string, project: IUser): Promise<IUser> => {
  checkIsValidObjectId(userId)
  const sanitazedUser = SanitazeUser(project)

  try {
    const updateUser = await UserModel.findByIdAndUpdate(userId, sanitazedUser, { new: true })
    if (!updateUser) {
      throw new Error('Пользователь не обновлен')
    }
    return updateUser
  } catch (error) {
    throw new Error('Ошибка при обновлении проекта')
  }
}

//* @desc DELETE user
//* @route DELETE /api/users/:id
//* @access private
export const deleteUserService = async (userId: string): Promise<void> => {
  checkIsValidObjectId(userId)

  try {
    const deleteUser = await UserModel.findByIdAndDelete(userId)
    if (!deleteUser) {
      throw new Error('Пользователь не удален')
    }
    return
  } catch (error) {
    throw new Error('Ошибка при удалении пользователя')
  }
}
