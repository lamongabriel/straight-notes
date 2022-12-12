import { Request, Response } from 'express'

import Note from '../../models/Note'

export async function updateNote (req: Request, res: Response) {
  try {
    const { title, body } = req.body
    const { id } = req.params

    if (!title || !body || !id) {
      return res.status(400).json({
        message: 'Invalid data, field TITLE and BODY are REQUIRED.'
      })
    }

    const note = await Note.findById(id)
    if (!note) {
      return res.status(400).json({
        message: 'Could not find a note with this ID.'
      })
    }

    if (String(note.author) === String(req.user._id)) {
      const newNote = await Note.findByIdAndUpdate({ _id: id }, {
        $set: {
          title,
          body
        }
      }, {
        new: true,
        upsert: true,
        returnDocument: 'after'
      })
      return res.status(200).json(newNote)
    } else {
      return res.status(403).json({
        message: 'You cannot update a note that is not yours.'
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
