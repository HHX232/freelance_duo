'use client'
import {FC} from 'react'

import ITelLinkProps, {TTypeDecorNumber} from './TelLink.types'
import LinkUI from '../../Text-Elements/Typography/Link/LinkUI'

const TelLink: FC<ITelLinkProps> = ({
  customNumber,
  customHref,
  extraClass,
  extraStyle,
  children,
  hideDefaultNumber,
  typeDecorNumber = 'spaces',
  linkSize = 'md'
}) => {
  const tel = customNumber || process.env.NEXT_PUBLIC_TELEPHONE_NUMBER || '71231234567'

  const formatPhoneNumber = (phoneNumber: string, format: TTypeDecorNumber): string => {
    const digits = phoneNumber.replace(/\D/g, '')

    if (digits.length !== 11 || !digits.startsWith('7')) {
      return phoneNumber
    }
    switch (format) {
      case 'spaces':
        return `+7 ${digits.substring(1, 4)} ${digits.substring(4, 7)} ${digits.substring(7, 9)} ${digits.substring(9)}`

      case 'classic':
        return `+7 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9)}`

      case 'dashed':
        return `+7-${digits.substring(1, 4)}-${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9)}`

      case 'monolite':
        return `+${digits}`

      default:
        return phoneNumber
    }
  }

  const formattedTel = tel ? formatPhoneNumber(tel, typeDecorNumber) : ''
  const plainTel = tel ? tel.replace(/\D/g, '') : ''
  const href = customHref || `tel:+${plainTel}`

  return (
    <LinkUI size={linkSize} href={href} extraClass={extraClass} extraStyle={extraStyle}>
      {hideDefaultNumber ? null : formattedTel}
      {children}
    </LinkUI>
  )
}

export default TelLink
