import { Request, Response } from 'express'

import Note from '../../models/Note'

export async function createNote (req: Request, res: Response) {
  try {
    const { title, body } = req.body

    if (!title || !body) {
      return res.status(400).json({
        message: 'Invalid data, field TITLE and BODY are REQUIRED.'
      })
    }

    const createdNote = await Note.create({
      author: req.user._id,
      title,
      body
    })

    res.status(201).json({ createdNote })
  } catch (error) {
    return res.status(500).json(error)
  }
}
