import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './components/auth/ProtectedRoutes'

import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { Register } from './screens/Register'

import { Notes } from './screens/Notes'
import { Account } from './screens/Account'

export function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/notes' element={<Notes />} />
        <Route path='/account' element={<Account />} />
      </Route>

    </Routes>
  )
}
