import { Router } from 'express'

import { withAuth } from '../middlewares/withAuth'

import { createNote } from '../useCases/note/createNote'

const routes = Router()

routes.post('/notes', withAuth, createNote)

export default routes
