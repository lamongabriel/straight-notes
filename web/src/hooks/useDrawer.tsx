import { useContext } from 'react'
import { DrawerContext } from '../contexts/DrawerContext'

export function useDrawer () {
  const context = useContext(DrawerContext)
  return context
}
