import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectToMongo () {
  const mongoURL = process.env.DATABASE_URL
  if (!mongoURL) throw new Error('😫 Missing .env config for Mongo URL')

  await mongoose.connect(mongoURL)
  console.log('📦 Connected to Mongo!')
}
