import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User'

dotenv.config()

export interface TokenPayload {
  _id: string
  email: string
  iat: number
  exp: number
}

export async function withAuth (req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(403).json({
        message: 'Forbidden: no authorization token was provided.'
      })
    }

    const token = authorization.replace('Bearer', '').trim()
    const payload = jwt.verify(token, process.env.SECRET as string) as TokenPayload

    const { _id } = payload
    const user = await User.findById(_id)

    if (user) {
      req.user = user
    } else {
      return res.sendStatus(500)
    }

    next()
  } catch {
    return res.sendStatus(403)
  }
}
