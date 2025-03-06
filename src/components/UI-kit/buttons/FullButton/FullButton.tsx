import {FC} from 'react'

type TFullButton = 'Link' | 'Button'
type TBorderColor =
  | 'none'
  | 'orange-light'
  | 'orange-dark'
  | 'blue-light'
  | 'blue-dark'
  | 'blue-extra-light'
  | 'gray'
  | 'dark'
export interface IFullButtonProps {
  type?: TFullButton
  border?: boolean
  borderColor?: TBorderColor | string
}

export const FullButton: FC<IFullButtonProps> = ({type}) => {
  return <></>
}
