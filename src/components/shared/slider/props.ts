import { HTMLAttributes, ReactNode } from 'react';

export type SliderProps = {
    items: ReadonlyArray<string>;
    dots?: boolean;
    controls?: boolean;
    autoplay?: boolean;
    infinite?: boolean;
    prefix?: ReactNode;
    overlay?: boolean;
    dotsSeparated?: boolean;
    contain?: boolean;
    onSlideChange?: (targetIndex: number) => void;
    allowFullScreen?: boolean;
    withIndicator?: boolean;
    slideProps?: HTMLAttributes<HTMLDivElement>;
    unmountOnExit?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'prefix'>;