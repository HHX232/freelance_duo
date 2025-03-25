import { Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useRef, useState } from "react";

interface CustomPlacemarkProps {
  coordinates: number[];
  hintText: string;
  size: number,
  iconUrl: string
  factory: any
}

const CustomPlacemark = ({ coordinates, hintText, size, iconUrl, factory }: CustomPlacemarkProps) => {
  const [hover, setHover] = useState(false);
  const pinRef = useRef<any>(null);
  useEffect(() => {
    //TODO: ховер не работает
    if(pinRef.current) {
        pinRef.current.events.add("mouseenter", () => {
            console.log('HOVER')
            setHover(true)
        });
        pinRef.current.events.add("mouseleave", () => setHover(false));
    }
  }, [pinRef.current])
  return (
    <Placemark
      geometry={coordinates}
      instanceRef={pinRef}
      modules={['geoObject.addon.balloon']}
      options={{
        iconLayout: factory && factory.templateLayoutFactory ?
            factory.templateLayoutFactory.createClass(`
                <div style="
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: ${size}px;
                    height: ${size}px;
                ">
                    <div style="
                    width: ${size}px;
                    height: ${size}px;
                    background: url('/map/icons/${iconUrl}') no-repeat center;
                    background-size: contain;
                    z-index: 99;
                    "></div>
                    ${hover ? `
                    <div style="
                        position: absolute;
                        left: ${size / 2}px;
                        top: 0;
                        height: ${size}px;
                        width: auto;
                        border-radius: 0 50% 5px 0;
                        background: white;
                        text-align: center;
                        padding: 0 ${size / 2}px;
                        line-height: ${size}px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                        font-size: 12px;
                        white-space: nowrap;
                        z-index: 98;
                    ">${hintText}</div>
                    ` : ""}
                </div>
            `)
        : "default#image",
        iconImageSize: [size, size],
        iconImageOffset: [-size / 2, -size / 2],
      } as any}
    />
  );
};

export default CustomPlacemark