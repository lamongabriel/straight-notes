import { Request, Response } from 'express'

import Note from '../../models/Note'

export async function searchNote (req: Request, res: Response) {
  try {
    const { q } = req.query

    if (!q) {
      return
    }

    const notes = await Note.find({ author: req.user._id }).find({ $text: { $search: `${q as string}` } })
    if (!notes) {
      return res.status(400).json({
        message: 'Could not find any note with this parameters.'
      })
    }

    res.status(200).json(notes)
  } catch (error) {
    return res.status(500).json(error)
  }
}
