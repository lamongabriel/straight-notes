import { Request, Response } from 'express'

import User from '../../models/User'

export async function deleteUser (req: Request, res: Response) {
  try {
    const userId = req.user._id

    await User.findByIdAndDelete(userId)

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json(error)
  }
}
