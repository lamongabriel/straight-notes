import { Routes, Route } from 'react-router-dom'

import { Home } from './screens/Home'

import { Login } from './screens/Login'
import { Register } from './screens/Register'

export function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
