import { useState } from 'react'
import { Header } from '../../components/Header'

export function Notes () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Header loggedIn isOpen={isOpen} onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)} />
  )
}
