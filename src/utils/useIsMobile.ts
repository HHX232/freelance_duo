'use client'

import { useLayoutEffect, useState } from 'react'

// Legacy
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 1280)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isMobile
}

export const useIsTablet = (value = 768) => {
  const [isTablet, setIsTablet] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsTablet(window.innerWidth < value)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [value])

  return isTablet
}

export const useIsMinWidth = (value = 768) => {
  const [isLarge, setIsLarge] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => {
      const currentWidth = window.innerWidth
      setIsLarge(currentWidth >= value)
    }
    window.addEventListener('resize', updateSize)
    updateSize() // Check on mount
    return () => window.removeEventListener('resize', updateSize)
  }, [value])

  return isLarge
}


// New breakpoints
export const useIsXs = (): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsBreakpoint(window.innerWidth < 480)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isBreakpoint
}

export const useIsSm = (): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsBreakpoint(window.innerWidth < 768)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isBreakpoint
}

export const useIsMd = (): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsBreakpoint(window.innerWidth < 1024)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isBreakpoint
}

export const useIsLg = (): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsBreakpoint(window.innerWidth < 1280)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isBreakpoint
}

export const useIsXl = (): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsBreakpoint(window.innerWidth < 1600)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isBreakpoint
}

export const useIsXxl = (): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsBreakpoint(window.innerWidth < 1920)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isBreakpoint
}

export const useIsXxxl = (): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () => setIsBreakpoint(window.innerWidth >= 1920)
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isBreakpoint
}