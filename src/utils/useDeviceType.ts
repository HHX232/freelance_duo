import { useEffect, useState } from "react";

//хук для проверки устройства с тач интерфейсом (не используется) 
export default function useDeviceType() {
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const updateDevice = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      
      setDevice(isMobile || hasTouch ? "mobile" : "desktop");
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);

    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  return device;
}