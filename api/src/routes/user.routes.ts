import { Router } from 'express'

import { registerUser } from '../useCases/user/registerUser'
import { loginUser } from '../useCases/user/loginUser'

import { withAuth } from '../middlewares/withAuth'

const routes = Router()

routes.post('/register', registerUser)
routes.post('/login', withAuth, loginUser)

export default routes
