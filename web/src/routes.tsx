import { Routes, Route } from 'react-router-dom'

import { Home } from './screens/Home'

export function Router () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}
