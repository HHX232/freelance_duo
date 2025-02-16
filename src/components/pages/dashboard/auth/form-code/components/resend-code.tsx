'use client'
import styles from './resend-code.module.scss'
import {useEffect, useState, forwardRef, useImperativeHandle} from 'react'
import {formatTimeHelper} from '@src/lib/utils/auth/formatTime.helper'

interface ResendCodeProps {
  initialTime?: number
  onTimerEnd: () => void
}

export const ResendCode = forwardRef(({initialTime = 30, onTimerEnd}: ResendCodeProps, ref) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useImperativeHandle(ref, () => ({
    resetTimer: () => {
      setTimeLeft(initialTime)
    }
  }))

  const handleResend = () => {
    setTimeLeft(initialTime)
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timerId)
    } else {
      onTimerEnd()
    }

    return undefined
  }, [timeLeft, onTimerEnd])

  return (
    <div className={styles.resend}>
      {timeLeft > 0 ? (
        <span>Отправить код повторно через {formatTimeHelper(timeLeft)}</span>
      ) : (
        <span onClick={() => handleResend()}>Отправить код повторно</span>
      )}
    </div>
  )
})

ResendCode.displayName = 'ResendCode'
