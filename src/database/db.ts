import mongoose from 'mongoose'
import { MONGO_URL } from '../utils/config.js'
import HttpException from '../utils/httpException.js'

export const connectDB = async () => {
  if (!MONGO_URL) {
    console.log('MONGO_URL не определен')
    process.exit(1)
  }
  try {
    await mongoose.connect(MONGO_URL)
    console.log('🤟 База данных подключена !')
  } catch (error) {
    console.log('🤔 Ошибка подключения к базе данных')
    process.exit(1)
  }
}

export const checkIsValidObjectId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException(`${id} не является идентификатором проекта. Проект не найден`, 400)
  }
}
