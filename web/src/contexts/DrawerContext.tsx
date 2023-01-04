import { createContext, ReactNode } from 'react'

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'

export const DrawerContext = createContext<UseDisclosureReturn>({} as UseDisclosureReturn)

interface DrawerContextProviderProps {
  children: ReactNode
}

export function DrawerContextProvider ({ children }: DrawerContextProviderProps) {
  const disclosure = useDisclosure()

  return (
    <DrawerContext.Provider value={disclosure}>
      {children}
    </DrawerContext.Provider>
  )
}
