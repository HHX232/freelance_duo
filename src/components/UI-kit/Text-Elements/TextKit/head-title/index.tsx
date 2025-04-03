"use client"
import classes from './index.module.scss'
import {ButtonHTMLAttributes, FC, useEffect, useRef, useState} from 'react'
import clsx from 'clsx'

export const HeadTitle: FC<ButtonHTMLAttributes<HTMLHeadingElement>> = ({children, ...props}) => {

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
    <h1 {...props} className={clsx(classes.headTitle, props.className, `${isVisible ? classes?.visible : ""}`)} ref={sectionRef}>
      {children}
    </h1>
  )
}
