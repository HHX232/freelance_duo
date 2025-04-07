import {HTMLAttributes} from 'react'

export interface ILogoutButtonProps extends HTMLAttributes<HTMLDivElement> {
  handleLogout: () => void
  style?: React.CSSProperties | undefined
}
