import { Request, Response } from 'express'

import Note from '../../models/Note'

export async function deleteNote (req: Request, res: Response) {
  try {
    const { id } = req.params

    const note = await Note.findById(id)

    if (String(note?.author) === String(req.user._id)) {
      await note?.deleteOne()
      return res.status(200).json({
        message: 'Note deleted succesfully'
      })
    } else {
      return res.status(403).json({
        message: 'You cannot delete a note that is not yours.'
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
