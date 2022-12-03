import { Router } from 'express'

import { withAuth } from '../middlewares/withAuth'

import { createNote } from '../useCases/note/createNote'
import { listNotesByUserId } from '../useCases/note/listNotesByUserId'
import { listNoteById } from '../useCases/note/listNoteById'
import { updateNote } from '../useCases/note/updateNote'
import { deleteNote } from '../useCases/note/deleteNote'

const routes = Router()

routes.get('/notes', withAuth, listNotesByUserId)
routes.get('/notes/:id', withAuth, listNoteById)

routes.post('/notes', withAuth, createNote)

routes.put('/notes/:id', withAuth, updateNote)

routes.delete('/notes/:id', withAuth, deleteNote)

export default routes
