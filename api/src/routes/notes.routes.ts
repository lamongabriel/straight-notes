import { Router } from 'express'

import { withAuth } from '../middlewares/withAuth'

import { createNote } from '../useCases/note/createNote'
import { listNotesByUserId } from '../useCases/note/listNotesByUserId'
import { listNoteById } from '../useCases/note/listNoteById'
import { updateNote } from '../useCases/note/updateNote'

const routes = Router()

routes.get('/notes', withAuth, listNotesByUserId)
routes.get('/notes/:id', withAuth, listNoteById)

routes.post('/notes', withAuth, createNote)

routes.put('/notes/:id', withAuth, updateNote)

export default routes
