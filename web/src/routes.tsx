import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './components/auth/ProtectedRoutes'
import { Loading } from './components/Loading'

import { Home } from './screens/Home'

import { Login } from './screens/Login'
import { Register } from './screens/Register'

export function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/test' element={<Loading />}/>
      </Route>

    </Routes>
  )
}
