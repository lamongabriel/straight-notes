import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../../models/User'

dotenv.config()

export async function loginUser (req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Invalid data, field EMAIL and PASSWORD are REQUIRED.'
      })
    }

    const currentUser = await User.findOne().where({ email })

    if (!currentUser) {
      return res.status(400).json({
        message: 'User does not exist.'
      })
    }

    const isPasswordValid = currentUser.verifyPassword(password)
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid password.'
      })
    }

    const token = jwt.sign({ _id: currentUser._id, name: currentUser.name, email }, process.env.SECRET as string, { expiresIn: '3d' })

    return res.status(200).json({ _id: currentUser._id, token })
  } catch (error) {
    return res.status(500).json(error)
  }
}
