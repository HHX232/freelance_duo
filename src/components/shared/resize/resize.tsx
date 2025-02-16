'use client'
import {useCallback, useEffect} from 'react'

export const ResizePage = () => {
  const preventDefault = useCallback((event: Event) => {
    event.preventDefault()
  }, [])

  const preventZoom = useCallback((event: KeyboardEvent | WheelEvent) => {
    if (
      (event instanceof KeyboardEvent &&
        (event.ctrlKey || event.metaKey) &&
        (event.key === '+' || event.key === '-' || event.key === '=')) ||
      (event instanceof WheelEvent && (event.ctrlKey || event.metaKey))
    ) {
      event.preventDefault()
    }
  }, [])
  useEffect(() => {
    // Prevent double-tap to zoom
    //document.addEventListener('touchstart', preventDefault, {passive: false})

    // Prevent pinch to zoom
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)
    document.addEventListener('gestureend', preventDefault)

    // Prevent zooming with Cmd/Ctrl + +/- and with wheel
    document.addEventListener('keydown', preventZoom)
    document.addEventListener('wheel', preventZoom, {passive: false})

    // Cleanup event listeners on component unmount
    return () => {
      //document.removeEventListener('touchstart', preventDefault)
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
      document.removeEventListener('gestureend', preventDefault)
      document.removeEventListener('keydown', preventZoom)
      document.removeEventListener('wheel', preventZoom)
    }
  }, [preventDefault, preventZoom])

  return null
}
