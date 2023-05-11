import { NextFunction, Response, Request } from 'express'
import HttpException from '../utils/httpException.js'
import { NODE_ENV } from '../utils/config.js'

export const ErrorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'Что-то пошло не так...'

  res.status(status).json({ message: message, stack: NODE_ENV === 'production' ? null : err.stack })
}
