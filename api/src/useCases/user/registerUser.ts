import { Request, Response } from 'express'

import User from '../../models/User'

export async function registerUser (req: Request, res: Response) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Invalid data, field NAME, EMAIL and PASSWORD are REQUIRED.'
      })
    }

    const userAlreadyCreated = await User.find().where({ email })
    if (userAlreadyCreated) {
      return res.status(400).json({
        message: 'An account is already registered with your email.'
      })
    }

    const newUser = await User.create({
      name,
      email,
      password
    })

    return res.status(201).json(newUser)
  } catch (error) {
    return res.json(error)
  }
}
