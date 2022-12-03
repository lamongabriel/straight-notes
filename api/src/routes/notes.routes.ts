import { Router } from 'express'

import { withAuth } from '../middlewares/withAuth'

import { createNote } from '../useCases/note/createNote'
import { listNotesByUserId } from '../useCases/note/listNotesByUserId'
import { listNoteById } from '../useCases/note/listNoteById'

const routes = Router()

routes.post('/notes', withAuth, createNote)
routes.get('/notes', withAuth, listNotesByUserId)
routes.get('/notes/:id', withAuth, listNoteById)

export default routes
