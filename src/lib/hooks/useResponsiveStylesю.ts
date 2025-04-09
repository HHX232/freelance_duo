import { useState, useEffect } from 'react';

interface Breakpoints  {
  [key: string]: number;
};

type Styles<T> = {
  [key in keyof Breakpoints]?: T;
};

const defaultBreakpoints = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600,
  xxxl: 1920,
};

function useResponsiveStyles<T>(
  styles: Styles<T>,
  breakpoints?: Breakpoints,
): T | undefined {
  const [currentStyle, setCurrentStyle] = useState<T | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let activeBreakpoint: string | null = null;

      // Находим подходящий брейкпоинт (от большего к меньшему)
      Object.entries(breakpoints || defaultBreakpoints)
        .sort((a, b) => b[1] - a[1])
        .some(([breakpoint, minWidth]) => {
          if (width >= minWidth) {
            activeBreakpoint = breakpoint;
            return true;
          }
          return false;
        });

      setCurrentStyle(activeBreakpoint ? styles[activeBreakpoint] : undefined);
    };

    // Первоначальная проверка
    handleResize();

    // Слушаем изменения размера
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentStyle;
}

export default useResponsiveStyles;