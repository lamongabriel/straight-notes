import { Request, Response } from 'express'

import Note from '../../models/Note'

export async function listNoteById (req: Request, res: Response) {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(400).json({
        message: 'Could not find a note with this ID.'
      })
    }
    if (String(note.author) === String(req.user._id)) {
      return res.status(200).json(note)
    } else {
      return res.status(403).json({
        message: 'You cannot get a note that is not yours.'
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
