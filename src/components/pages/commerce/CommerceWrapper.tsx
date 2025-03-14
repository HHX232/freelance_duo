'use client'
import styles from './CommerceWrapper.module.scss'
import Head from '@pages/commerce/components/head/Head'
import MakeTicket from '@pages/commerce/components/rent/MakeTicket'
import {useEffect, useState} from 'react'
import ModalForm from '@pages/commerce/components/modalForm/ModalForm'
import CloseIcon from '@icons/CloseIcon.svg'
import FindUs from '@pages/commerce/components/FindUs/FindUs'
import {useIsMaxWidth} from '@utils/useIsMobile'
import MapModal from '@pages/commerce/components/FindUs/mapModal'

const CommerceWrapper = () => {
  const [isModal, setIsModal] = useState(false)
  const [isMapModal, setIsMapModal] = useState(false)
  const openModal = () => setIsModal(true)
  const openMapModal = () => setIsMapModal(true)
  const isTablet = useIsMaxWidth(1023)

  useEffect(() => {
    isModal || (isTablet && isMapModal) ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  }, [isModal, isMapModal])

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
      {isMapModal && isTablet && (
        <ModalForm onClose={() => setIsMapModal(false)}>
          <MapModal
            closeModal={() => setIsMapModal(false)}
          />
        </ModalForm>
      )}
      <Head />
      <MakeTicket openModal={openModal} />
      <FindUs openMapModal={openMapModal} />
    </div>
  )
}

export default CommerceWrapper
