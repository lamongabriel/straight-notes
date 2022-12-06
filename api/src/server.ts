import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectToMongo } from './database/mongo'

import userRoutes from './routes/user.routes'
import notesRoutes from './routes/notes.routes'

dotenv.config()

async function bootstrap () {
  const app = express()

  await connectToMongo()

  app.use(express.json())
  app.use(cors())

  // routes
  app.use('/users', userRoutes)
  app.use('/notes', notesRoutes)

  app.use((req, res) => {
    res.sendStatus(404)
  })

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`🚀 Server started at http://localhost:${process.env.SERVER_PORT as string}`)
  })
}

bootstrap()
