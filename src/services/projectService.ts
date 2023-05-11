import ProjectModel from '../models/projectModel.js'
import { IProject } from '../types/projectTypes.js'
import { checkIsValidObjectId } from '../database/db.js'
import { SanitazeProject } from '../utils/projectSanitizer.js'

//* @desc GET All projects
//* @route GET /api/projects
//* @access public
export const getProjectsService = async (): Promise<IProject[]> => {
  try {
    const projects = await ProjectModel.find()
    if (!projects) {
      throw new Error('Проекты не найдены')
    }
    return projects
  } catch (err) {
    throw new Error('Проекты не найдены')
  }
}

//* @desc GET project
//* @route GET /api/projects/:id
//* @access public
export const getProjectService = async (projectId: string): Promise<IProject> => {
  checkIsValidObjectId(projectId)

  try {
    const newProject = await ProjectModel.findById(projectId)
    if (!newProject) {
      throw new Error('Проект не найден')
    }
    return newProject
  } catch (error) {
    throw new Error('Проект не найден')
  }
}

//* @desc CREATE project
//* @route POST /api/projects
//* @access private
export const createProjectService = async (project: IProject): Promise<IProject> => {
  const sanitazedProject = SanitazeProject(project)

  try {
    const newProject = await ProjectModel.create(sanitazedProject)
    if (!newProject) {
      throw new Error('Проекты не создан')
    }
    return newProject
  } catch (error) {
    throw new Error('Ошибка при создании проекта')
  }
}

//* @desc UPDATE project
//* @route PUT /api/projects/:id
//* @access private
export const UpdateProjectService = async (projectId: string, project: IProject): Promise<IProject> => {
  checkIsValidObjectId(projectId)
  const sanitazedProject = SanitazeProject(project)

  try {
    const updateProject = await ProjectModel.findByIdAndUpdate(projectId, sanitazedProject, { new: true })
    if (!updateProject) {
      throw new Error('Проект не создан')
    }
    return updateProject
  } catch (error) {
    throw new Error('Ошибка при обновлении проекта')
  }
}

//* @desc DELETE project
//* @route DELETE /api/projects/:id
//* @access private
export const DeleteProjectService = async (projectId: string): Promise<void> => {
  checkIsValidObjectId(projectId)

  try {
    const deleteProject = await ProjectModel.findByIdAndDelete(projectId)
    if (!deleteProject) {
      throw new Error('Проект не удален')
    }
    return
  } catch (error) {
    throw new Error('Ошибка при удалении проекта')
  }
}
