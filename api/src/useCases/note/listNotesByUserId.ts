import { Request, Response } from 'express'

import Note from '../../models/Note'

export async function listNotesByUserId (req: Request, res: Response) {
  try {
    const notes = await Note.find().where({ author: req.user._id })
    res.json(notes)
  } catch (error) {
    return res.status(500).json(error)
  }
}
