import { model } from 'mongoose'
import projectSchema, { IProjectSchema } from '../schema/projectSchema.js'

const ProjectModel = model<IProjectSchema>('Project', projectSchema)

export default ProjectModel
