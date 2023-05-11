import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { IUser } from '../types/userTypes.js'
import { emailRegex } from '../schema/userSchema.js'
import HttpException from '../utils/httpException.js'

export const SanitazeUser = async (user: IUser): Promise<IUser> => {
  let sanitazedUser = <IUser>{}

  sanitazedUser.email = sanitazeEmail(user.email)
  sanitazedUser.isAdmin = sanitazeIsAdmin(user.isAdmin)
  sanitazedUser.username = sanitazeUsername(user.username)
  sanitazedUser.password = await sanitazePassword(user.password)

  return sanitazedUser
}

const sanitazeUsername = (username: string): string => {
  if (username === undefined) {
    throw new HttpException('Имя пользователя не определено', 400)
  }
  if (typeof username !== 'string') {
    throw new HttpException('Имя пользователя не определено', 400)
  }

  username = username.trim()

  return username
}

const sanitazeIsAdmin = (isAdmin: boolean): boolean => {
  if (!isAdmin) isAdmin = false

  return isAdmin
}
const sanitazeEmail = (email: string): string => {
  if (email === undefined) {
    throw new HttpException('Почта не определена', 400)
  }
  if (typeof email !== 'string') {
    throw new HttpException('Почта не определена', 400)
  }
  email = email.trim()

  if (email.length < 6) {
    throw new HttpException('Почта не может быть менее 6 символов', 400)
  }
  if (email.length > 50) {
    throw new HttpException('Почта не должена превышать 50 символов', 400)
  }
  if (!email.match(emailRegex)) {
    throw new HttpException('Почта не соответствует формату', 400)
  }
  return email
}

const sanitazePassword = async (password: string): Promise<string> => {
  if (password === undefined) {
    throw new HttpException('Пароль не определен', 400)
  }
  if (typeof password !== 'string') {
    throw new HttpException('Пароль не определен', 400)
  }
  password = password.trim()
  if (password.length < 6) {
    throw new HttpException('Пароль не может быть менее 6 символов', 400)
  }
  if (password.length > 50) {
    throw new HttpException('Пароль не должена превышать 50 символов', 400)
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}
