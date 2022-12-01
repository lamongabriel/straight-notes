import express from 'express'
import dotenv from 'dotenv'

import { connectToMongo } from './database/mongo'

import userRoutes from './routes/user.routes'

dotenv.config()

async function bootstrap () {
  const app = express()

  await connectToMongo()

  app.use(express.json())

  // routes
  app.use(userRoutes)

  app.use((req, res) => {
    res.sendStatus(404)
  })

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`🚀 Server started at http://localhost:${process.env.SERVER_PORT as string}`)
  })
}

bootstrap()
