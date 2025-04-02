"use client"
import styles from './ContactForm.module.scss'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'
import Link from 'next/link'
import InputPhoneUI from '@src/components/UI-kit/BaseControls/inputs/InputPhoneUI/InputPhoneUI'
import clsx from 'clsx'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'
import { useEffect, useRef, useState } from 'react'


const ContactFormPage = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div itemScope itemType='https://schema.org/WebPage'>
      <section
        className={styles['contact-form-wrapper']}
        itemScope
        ref={sectionRef}
        itemType='https://schema.org/ContactPage' // Специальный тип для страницы контактов
      >
        <div className={styles['info']}>
          <div
            className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
            itemScope
            itemType='https://schema.org/ContactPoint' // Разметка формы как контактного пункта
          >
            <h3 className={styles.title} itemProp='name'>
              Узнайте больше
            </h3>

            <ParagraphUI itemProp='description' extraClass={styles.extra_subtitle} size={'md'} weight={'light'}>
              Оставьте заявку на обратный звонок и персональный менеджер свяжется с вами, для уточнения деталей
            </ParagraphUI>

            <form
              className={styles.form_width}
              itemProp='potentialAction'
              itemScope
              itemType='https://schema.org/Action'
            >
              <div className={styles['input-wrapper']}>
                <InputTextUI icon={<></>} theme={'white'} labelText={'Имя'} placeholder='Введите имя' itemProp='name' />
              </div>

              <div className={clsx(styles['input-wrapper'], styles.marginTop)}>
                <InputPhoneUI icon={<></>} theme={'white'} labelText={'Телефон'} itemProp='telephone' />
              </div>

              <FullButton
                type={'Button'}
                onClick={() => {}}
                activeButton={true}
                border={false}
                borderColor={'none'}
                buttonFill={'bronze-500'}
                buttonText={'Отправить'}
                buttonElementColor={'white'}
                buttonBorderRadius={'6px'}
                extraClass={styles['button-send']}
                itemProp='action'
                alternativeBorderOnActive
                alternativeBorderWidth='3px'
                alternativeBorderColor='bronze'
              />

              <p className={styles.caption}>
                Нажимая кнопку «Отправить», вы даёте согласие на{' '}
                {/* Пропс на ссылку отображения соглашения на обработку персональных данных */}
                <Link href='/consent' itemProp='url'>
                  обработку своих персональных данных
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className={styles.bg} />
      </section>
    </div>
  )
}

export default ContactFormPage
