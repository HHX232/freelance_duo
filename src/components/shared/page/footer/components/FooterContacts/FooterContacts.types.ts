import {IFooterNavigationProps} from '../FooterNavigation/FooterNavigation.types'

export interface IFooterContactsProps {
  navProps: IFooterNavigationProps
  isDashboard: boolean
  isLK: boolean
  token: string | null
  onClickPrivateOffice: () => void
}
