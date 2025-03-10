'use client'
import styles from './CommerceWrapper.module.scss'
import Head from '@pages/commerce/components/head/Head'
import MakeTicket from '@pages/commerce/components/rent/MakeTicket'
import {useEffect, useState} from 'react'
import ModalForm from '@pages/commerce/components/modalForm/ModalForm'
import CloseIcon from '@icons/CloseIcon.svg'
import FindUs from '@pages/commerce/components/FindUs/FindUs'

const CommerceWrapper = () => {
  const [isModal, setIsModal] = useState(false)
  const openModal = () => setIsModal(true)

  useEffect(() => {
    isModal ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  }, [isModal])

  return (
    <div className={styles.wrapper}>
      {isModal && (
        <ModalForm onClose={() => setIsModal(false)}>
          <div
            className={styles.ticketModal}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className={styles.modalHead} onClick={() => setIsModal(false)}>
              <CloseIcon />
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalTitle}>Спасибо, ваша заявка отправлена</div>
              <div className={styles.modalText}>
                Наши менеджеры расмотрят заявку в течение 2 рабочих дней, и свяжутся с вами в случае положительного
                решения
              </div>
            </div>
          </div>
        </ModalForm>
      )}
      <Head />
      <MakeTicket openModal={openModal} />
      <FindUs />
    </div>
  )
}

export default CommerceWrapper
