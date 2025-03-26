import { Placemark } from "@pbe/react-yandex-maps";

interface CustomPlacemarkProps {
  coordinates: number[];
  hintText: string;
  size: number;
  iconUrl: string;
  factory: any;
  foreignHover: boolean
}

const CustomPlacemark = ({ coordinates, hintText, size, iconUrl, factory, foreignHover }: CustomPlacemarkProps) => {

  return (
    <Placemark
      geometry={coordinates}
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
                    <div class="innericon" style="
                    width: ${size}px;
                    height: ${size}px;
                    background: url('/map/icons/${iconUrl}') no-repeat center;
                    background-size: contain;
                    z-index: 3;
                    "></div>
                    ${foreignHover ? `
                    <div style="
                        position: absolute;
                        left: ${size / 2}px;
                        top: 0;
                        height: ${size}px;
                        width: auto;
                        border-radius: 0 50px 5px 0;
                        background: white;
                        text-align: center;
                        padding: 0 ${size / 2}px;
                        line-height: ${size}px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                        font-size: 12px;
                        font-weight: 300;
                        white-space: nowrap;
                        z-index: 2;
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