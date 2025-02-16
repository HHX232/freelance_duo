'use client'
import {useEffect} from 'react'

export const Jivo = () => {
  useEffect(() => {
    // Функция для добавления кастомных стилей
    const injectCustomStyles = () => {
      const style = document.createElement('style')
      style.innerHTML = `
        .__jivoMobileButton {
          --jivoMobileOffsetBottom: 15px !important;
        }
        .button_f996 {
          height: 42px !important;
          width: 42px !important;
        }
        .icons_d38b {
          height: 28px !important;
          width: 23px !important;
          background-size: contain !important;
          background-position: center center !important;
        }
      `
      document.head.appendChild(style)
    }

    // Функция для обработки загрузки скрипта
    const handleScriptLoad = () => {
      injectCustomStyles()
      console.log('Jivo script loaded')
    }

    // Устанавливаем таймер для отложенной загрузки
    const timerId = setTimeout(() => {
      // Устанавливаем скрипт через next/script
      const script = document.createElement('script')
      script.src = '//code.jivosite.com/script/widget/AhGHYxVTAP'
      script.type = 'text/javascript'
      script.async = true
      script.onload = handleScriptLoad
      document.head.appendChild(script)
    }, 10000)

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timerId)
  }, [])

  return null // Компонент ничего не рендерит
}
