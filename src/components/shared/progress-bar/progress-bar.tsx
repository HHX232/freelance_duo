import clsx from 'clsx';
import { ProgressBarProps } from './props';
import styles from './styles.module.scss';
import { CSSProperties } from 'react';

export const ProgressBar = ({ value, determinate, className, variant = 'default', ...rest }: ProgressBarProps) => {
	return (
		<div className={clsx(className, styles['progress-bar'], styles[variant])} {...rest}>
			<div 
				className={clsx(styles.line, styles[variant])}
				style={{
					'--progress-percent': value,
					'--progress-min-width': 'calc(var(--progress-percent) * 1% / 2)',
					'--progress-max-width': 'calc(var(--progress-percent) * 1%)',
					'--progress-left': 'calc(100% - var(--progress-min-width))',
					...(!determinate ? {
						animationName: styles['progress-animation'],
						animationDuration: '2.5s',
						animationDirection: 'normal',
						animationDelay: '0s',
						animationPlayState: 'running',
						animationIterationCount: 'infinite',
						animationTimingFunction: 'ease-in-out'
					} : {}),
				} as CSSProperties}    
			/>
		</div>
	);
};