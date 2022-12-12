import { Router } from 'express'

import { registerUser } from '../useCases/user/registerUser'
import { loginUser } from '../useCases/user/loginUser'
import { whoAmI } from '../useCases/user/whoami'
import { updateUser } from '../useCases/user/updateUser'
import { withAuth } from '../middlewares/withAuth'
import { deleteUser } from '../useCases/user/deleteUser'

const routes = Router()

routes.put('/', withAuth, updateUser)
routes.delete('/', withAuth, deleteUser)

routes.get('/whoami', whoAmI)
routes.post('/register', registerUser)
routes.post('/login', loginUser)

export default routes
