import { useContext } from 'react'
import { DrawerContext } from '../contexts/drawerContext'

export function useDrawer () {
  const context = useContext(DrawerContext)
  return context
}
