import { Request, Response } from 'express'

import User from '../../models/User'

export async function updateUser (req: Request, res: Response) {
  try {
    const { name, email, password, newPassword, newEmail } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Invalid data, field NAME, EMAIL and PASSWORD are REQUIRED.'
      })
    }

    console.log('foi')

    const currentUser = await User.findOne({ email })

    if (!currentUser) {
      return res.status(400).json({
        message: 'Invalid e-mail.'
      })
    }

    if (req.user.email !== email) {
      return res.status(403).json({
        message: 'You cannot update this user.'
      })
    }

    if (newEmail) {
      const isEmailBeingUsed = await User.findOne({ email: newEmail })
      if (isEmailBeingUsed) {
        return res.status(403).json({
          message: 'E-mail already being used.'
        })
      }
    }

    const isPasswordValid = currentUser.verifyPassword(password)
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid password.'
      })
    }

    currentUser.password = newPassword ?? currentUser.password
    currentUser.name = name
    currentUser.email = newEmail ?? currentUser.email

    currentUser.save()

    return res.status(200).json({
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}
