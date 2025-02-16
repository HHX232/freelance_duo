import {ReactNode} from 'react'
import {ResizePage} from '@shared/resize/resize'
interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
  return (
    <>
      {children}
      <ResizePage />
    </>
  )
}

export default DashboardLayout
