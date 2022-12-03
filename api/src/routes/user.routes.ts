import { Router } from 'express'

import { registerUser } from '../useCases/user/registerUser'
import { loginUser } from '../useCases/user/loginUser'

const routes = Router()

routes.post('/register', registerUser)
routes.post('/login', loginUser)

export default routes
