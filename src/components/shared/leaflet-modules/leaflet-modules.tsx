import { FC, useEffect } from "react"
import { useMap } from "react-leaflet"

export const ChangeZoom: FC<{zoomLevel: number}> = ({zoomLevel}) => {
  const map = useMap()
  useEffect(() => {
    map.setZoom(zoomLevel)
    map.setMinZoom(zoomLevel)
  }, [zoomLevel, map])
  return null
}