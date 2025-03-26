import {HTMLAttributes} from 'react'

export interface ILogoLinkProps extends HTMLAttributes<HTMLDivElement> {
  isMenuOpened: boolean
  isSmall: boolean
  isTransparent: boolean
}
