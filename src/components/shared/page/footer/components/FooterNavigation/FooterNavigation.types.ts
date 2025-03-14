export interface IFooterNavigationProps {
  linksGroups: IFooterNavigationLinksGroup[]
  secondaryLinks: IFooterNavigationLink[]
}

export interface IFooterNavigationLinksGroup {
  links: IFooterNavigationLink[]
}

export interface IMobileFooterNavigationLinksGroup {
  name: React.ReactNode
  links: IFooterNavigationLink[]
}

export interface IFooterNavigationLink {
  name: string | React.ReactNode
  href?: string
}
