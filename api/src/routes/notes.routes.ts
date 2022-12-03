import { Router } from 'express'

import { withAuth } from '../middlewares/withAuth'

import { createNote } from '../useCases/note/createNote'
import { listNotesByUserId } from '../useCases/note/listNotesByUserId'

const routes = Router()

routes.post('/notes', withAuth, createNote)
routes.get('/notes', withAuth, listNotesByUserId)

export default routes
