import {ReactNode} from 'react'
import {ResizePage} from '@shared/resize/resize'
//import {ResizePage} from '@shared/resize/resize'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <>
      {children}
      <ResizePage />
    </>
  )
}

export default MainLayout
