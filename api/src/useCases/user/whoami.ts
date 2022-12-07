import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { TokenPayload } from '../../middlewares/withAuth'

dotenv.config()

export async function whoAmI (req: Request, res: Response) {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(403).json({
        message: 'Invalid data, field TOKEN are REQUIRED.'
      })
    }

    const token = authorization.replace('Bearer', '').trim()

    const decodedToken = jwt.verify(token, process.env.SECRET as string) as TokenPayload

    res.status(200).json({
      token: decodedToken
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}
