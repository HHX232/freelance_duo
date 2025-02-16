import { HTMLAttributes } from 'react';

export type ProgressBarProps = {
    value: number;
    determinate?: boolean;
    variant?: 'default' | 'secondary';
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;