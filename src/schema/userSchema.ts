import { Schema } from 'mongoose'
import { IUser } from '../types/userTypes.js'

export const emailRegex = /.+@.+\..+/i

export interface IUserSchema extends IUser {
  _id: string
}

const userSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Имя обязательное поле'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Почта обязательное поле'],
      unique: true,
      min: [6, 'Почта должна содержать не менее 6 символов'],
      max: [50, 'Почта не должна содержать более 50 символов'],
      match: [emailRegex, 'Формат не соответствует почте'],
    },
    password: {
      type: String,
      required: [true, 'Пароль обязателен'],
      min: [6, 'Пароль должен содержать не менее 6 символов'],
      max: [50, 'Пароль не должн содержать более 50 символов'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  },
)

export default userSchema
