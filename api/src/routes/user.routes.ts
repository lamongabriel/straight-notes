import { Router } from 'express'

import { registerUser } from '../useCases/user/registerUser'
import { loginUser } from '../useCases/user/loginUser'
import { whoAmI } from '../useCases/user/whoami'

const routes = Router()

routes.get('/whoami', whoAmI)

routes.post('/register', registerUser)
routes.post('/login', loginUser)

export default routes
