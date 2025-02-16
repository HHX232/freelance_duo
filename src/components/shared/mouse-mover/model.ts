import { Size } from '@src/components/model'
import { ReactNode } from 'react'

export interface MouseMoverProps {
  children: ReactNode | ((size: Size) => ReactNode)
  className?: string
  innerClassName?: string
  isMobile?: boolean
  isMobileCardVisible?: boolean
}
