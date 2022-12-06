import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './components/auth/ProtectedRoutes'

import { Home } from './screens/Home'

import { Login } from './screens/Login'
import { Notes } from './screens/Notes'
import { Register } from './screens/Register'

export function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/notes' element={<Notes />} />
      </Route>

    </Routes>
  )
}
