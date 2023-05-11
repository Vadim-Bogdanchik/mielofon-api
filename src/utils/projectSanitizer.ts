import { IProject } from '../types/projectTypes.js'
import HttpException from '../utils/httpException.js'

export const SanitazeProject = (project: IProject): IProject => {
  let sanitazedProject = <IProject>{}

  sanitazedProject.title = sanitazeTitle(project.title)

  return sanitazedProject
}

const sanitazeTitle = (title: string): string => {
  if (title === undefined) {
    throw new HttpException('Заголовок не определен', 400)
  }
  if (typeof title !== 'string') {
    throw new HttpException('Заголовок не определен', 400)
  }

  title = title.trim()
  if (title.length < 3) {
    throw new HttpException('Заголовок не может быть менее 3 символов', 400)
  }
  if (title.length > 50) {
    throw new HttpException('Заголовок не должен превышать 50 символов', 400)
  }

  return title
}
