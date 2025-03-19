'use client'
import styles from './Socials.module.scss'
import PhoneSVG from '@icons/phone.svg'
import MessageSVG from '@icons/message.svg'
import TelegramHiddenSVG from '@icons/telegramHidden.svg'
import PhoneHiddenSVG from '@icons/phoneHidden.svg'
import MobileHiddenSVG from '@icons/mobileHidden.svg'
import MailHiddenSVG from '@icons/mailHidden.svg'

// import Link from 'next/link'
import {useState} from 'react'
import clsx from 'clsx'

export interface SocialsProps {
  socialsType?: 'light' | 'dark' | 'accent'
}

const Socials = ({socialsType = 'dark'}: SocialsProps) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleToggleHidden = () => {
    console.log('welfneijrfiuuerfbiejrbijheibr')
    setIsOpened((prevState) => !prevState)
  }

  // const [isJivo, setIsJivo] = useState(false);
  //
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const checkJivo = () => {
  //       setIsJivo(window.jivo_api !== undefined);
  //     };
  //
  //     checkJivo();
  //
  //     const interval = setInterval(checkJivo, 1000);
  //
  //     return () => clearInterval(interval);
  //   }
  //   return undefined
  // }, []);

  return (
    <div
      className={clsx(styles.wrapper, isOpened ? styles.opened : '', styles[`${socialsType}Color`])}
      onClick={handleToggleHidden}
    >
      <PhoneSVG className={clsx(styles[`${socialsType}Color`], styles.phone)} />
      <div className={clsx(styles.innerWrapper, isOpened ? styles.opened : '', styles[`${socialsType}Color`])}>
        {/*{isJivo ? (*/}
        {/*  <MessageSVG className={styles[`${socialsType}Color`]} onClick={() => isOpened && window.jivo_api.open()}/>*/}
        {/*) : (*/}
        {/*  <MessageSVG className={styles[`${socialsType}Color`]} style={{display: isOpened ? 'none' : 'block'}}/>*/}
        {/*)}*/}
        <MessageSVG className={styles[`${socialsType}Color`]} />
        <div className={clsx(styles.hiddenIcons, isOpened ? styles.opened : '')}>
          <PhoneHiddenSVG className={styles[`${socialsType}Color`]} />
          <TelegramHiddenSVG className={styles[`${socialsType}Color`]} />
          <MobileHiddenSVG className={styles[`${socialsType}Color`]} />
          <MailHiddenSVG className={styles[`${socialsType}Color`]} />
        </div>
      </div>
    </div>
  )
}

export default Socials
