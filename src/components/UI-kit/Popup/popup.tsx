'use client'
import {FC, PropsWithChildren} from 'react'
import Popup from 'reactjs-popup'
import s from './popup.module.scss'
import clsx from 'clsx'

import CrossIcon from '@icons/cross.svg'

interface IPopUpWrapperProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  modalContentClassName?: string
}

const PopupWrapper: FC<IPopUpWrapperProps & PropsWithChildren> = (props) => {
  const {children, isOpen, setIsOpen, modalContentClassName} = props

  const closeModal = () => setIsOpen(false)

  return (
    <Popup  lockScroll open={isOpen} onClose={closeModal}>
      <div className={s.header}>
        <button onClick={closeModal} className={s.close_button}>
          <CrossIcon />
        </button>
      </div>
      <div className={clsx(s.modal, modalContentClassName)}>{children}</div>
    </Popup>
  )
}

export default PopupWrapper
