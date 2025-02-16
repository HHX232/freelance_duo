import React from 'react'

export const getInputStyle = (value: string | undefined): React.CSSProperties => ({
  background: value ? '#fff' : 'initial'
})

export const setContainerStyle = (maxWidth: number | undefined): React.CSSProperties => ({
  maxWidth: maxWidth || 'none',
  width: '100%'
})
