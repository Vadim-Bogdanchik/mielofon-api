import { model } from 'mongoose'
import userSchema, { IUserSchema } from '../schema/userSchema.js'

const UserModel = model<IUserSchema>('User', userSchema)

export default UserModel
