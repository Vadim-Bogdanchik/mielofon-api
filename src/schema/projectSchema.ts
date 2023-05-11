import { Schema } from 'mongoose'
import { IProject } from '../types/projectTypes.js'

export interface IProjectSchema extends IProject {
  _id: string
}

const projectSchema: Schema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

export default projectSchema