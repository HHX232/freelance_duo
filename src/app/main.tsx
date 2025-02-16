import React, {ReactNode} from 'react'

import '@src/fonts/fonts.scss'
import '@src/scss/main.scss'

const Main = ({children}: {children: ReactNode}) => <React.StrictMode>{children}</React.StrictMode>

export {Main}
