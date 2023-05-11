import express from 'express'
import { PORT } from './utils/config.js'
import ProjectRoutes from './routes/projectRoutes.js'
import UserRoutes from './routes/userRoutes.js'
import { ErrorHandler } from './middleware/errorMiddleware.js'
import { connectDB } from './database/db.js'

connectDB()

const app = express()
app.use(express.json())

app.use('/api/projects', ProjectRoutes)
app.use('/api/users', UserRoutes)

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`🙌 Сервер запущен на порту ${PORT}`)
})
