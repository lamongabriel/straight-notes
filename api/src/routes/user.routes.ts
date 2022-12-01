import { Router } from 'express'

import { registerUser } from '../useCases/user/registerUser'

const routes = Router()

routes.post('/register', registerUser)

export default routes
