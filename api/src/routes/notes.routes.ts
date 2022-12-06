import { Router } from 'express'

import { withAuth } from '../middlewares/withAuth'

import { createNote } from '../useCases/note/createNote'
import { listNotesByUserId } from '../useCases/note/listNotesByUserId'
import { listNoteById } from '../useCases/note/listNoteById'
import { updateNote } from '../useCases/note/updateNote'
import { deleteNote } from '../useCases/note/deleteNote'
import { searchNote } from '../useCases/note/searchNote'

const routes = Router()

routes.get('/', withAuth, listNotesByUserId)
routes.get('/search', withAuth, searchNote)
routes.get('/:id', withAuth, listNoteById)

routes.post('/', withAuth, createNote)

routes.put('/:id', withAuth, updateNote)

routes.delete('/:id', withAuth, deleteNote)

export default routes
