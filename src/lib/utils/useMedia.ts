// @ts-strict-ignore
import {useEffect, useState} from 'react'

interface Sizes {
  width: number | undefined
  height: number | undefined
}

interface ReturnMediaProps {
  windowSize: Sizes
  isLargerThan?: (breakpoint: string) => boolean
  isLessOrEqualThan?: (breakpoint: string) => boolean
  isLessThan?: (breakpoint: string) => boolean
}

export const useMedia = (): ReturnMediaProps => {
  const [windowSize, setWindowSize] = useState<Sizes>({
    width: undefined,
    height: undefined
  })

  const isLessThan = (breakpoint: string): boolean =>
    windowSize.width !== undefined && parseInt(breakpoint, 10) >= windowSize.width
  const isLargerThan = (breakpoint: string): boolean =>
    windowSize.width !== undefined && parseInt(breakpoint, 10) < windowSize.width
  const isLessOrEqualThan = (breakpoint: string): boolean =>
    windowSize.width !== undefined && parseInt(breakpoint, 10) <= windowSize.width

  useEffect(() => {
    const onWindowResize = (): void =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })

    window.addEventListener(`resize`, onWindowResize)
    onWindowResize()

    return () => window.removeEventListener(`resize`, onWindowResize)
  }, [])

  return {windowSize, isLargerThan, isLessThan, isLessOrEqualThan}
}
