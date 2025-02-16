import {Coords, Size} from '@src/components/model'

const ICON_SIZE = 60
const PADDING = 100
const TEXT_PADDING = 10

export const calcLocation = (
  coords: Coords,
  contentElem: HTMLDivElement,
  textElem: HTMLParagraphElement,
  size: Size,
  isSailIcon = false
) => {
  const imageWidth = size.w
  const imageHeight = size.h

  const x = (coords.x / 100) * imageWidth
  const y = (coords.y / 100) * imageHeight

  const isInTheRightSide = x > imageWidth / 2
  const isInTheBottomSide = y > imageHeight / 2

  const textWidth = textElem.clientWidth
  const textHeight = textElem.clientHeight
  const contentWidth = contentElem.clientWidth
  const contentHeight = contentElem.clientHeight

  const isEnoughRight = x + ICON_SIZE + textWidth < imageWidth
  const isEnoughLeft = x - textWidth > 0
  const isEnoughBottom = y + ICON_SIZE + textHeight < imageHeight
  const isEnoughTop = y - textHeight > 0

  const isTextRight = (isInTheRightSide && isEnoughRight) || (!isInTheRightSide && !isEnoughLeft)
  const isTextTop = (isInTheBottomSide && isEnoughBottom) || (!isInTheBottomSide && !isEnoughTop)

  const textShiftX = isTextRight ? ICON_SIZE + TEXT_PADDING : -(textWidth + TEXT_PADDING)
  const textShiftY = isTextTop ? ICON_SIZE + TEXT_PADDING : -(textHeight + TEXT_PADDING)

  const contentShiftX = isInTheRightSide ? -(contentWidth + PADDING) : ICON_SIZE + PADDING
  const contentShiftY = isInTheBottomSide ? -(contentHeight + PADDING) : ICON_SIZE + PADDING

  const lineShiftX = isSailIcon ? ICON_SIZE : ICON_SIZE / 2
  const lineShiftY = isSailIcon ? 0 : ICON_SIZE / 2

  const lineWidthX = contentShiftX - lineShiftX + (isInTheBottomSide ? contentWidth : 0)
  const lineWidthY = contentShiftY - lineShiftY + (isInTheBottomSide ? contentHeight : 0)

  const lineWidth = Math.sqrt(lineWidthX ** 2 + lineWidthY ** 2)

  const lineRotate = ((isInTheBottomSide ? -1 : 1) * (Math.acos(lineWidthX / lineWidth) * 180)) / Math.PI

  return {
    text: {
      x: x + textShiftX,
      y: y + textShiftY
    },
    content: {
      x: x + contentShiftX,
      y: y + contentShiftY
    },
    line: {
      x: x + lineShiftX,
      y: y + lineShiftY,
      width: lineWidth,
      rotate: lineRotate
    }
  }
}
