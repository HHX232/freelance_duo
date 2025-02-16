'use client';
import clsx from 'clsx';
import { SliderProps } from './props';
import styles from './styles.module.scss';
import { CSSTransition } from 'react-transition-group';
import { createRef, CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProgressBar } from '../progress-bar/progress-bar';

const transitionDuration = 256;
const slideDuration = 5000;

export const Slider = ({ items, dots = true, unmountOnExit, controls = true, contain, prefix, className, children, autoplay, infinite, overlay, dotsSeparated, onSlideChange, slideProps = {}, ...rest }: SliderProps) => {
	const itemsLength = useMemo(() => items.length, [items]);
	const [direction, setDirection] = useState<'positive' | 'opposite'>('positive');
	const [targetIndex, settargetIndex] = useState(0);
	const [count, setCount] = useState(0);
	const nodeRefs = useRef(items.map(() => createRef<HTMLDivElement>()));

	const onDotClick = useCallback((index: number) => () => {
		if (index !== targetIndex) {
			setDirection(index === 0 ? 'positive' : index > targetIndex ? 'positive' : 'opposite');
			settargetIndex(index);
			onSlideChange?.(index);
			setCount(0);
		}
	}, [onSlideChange, targetIndex]);

	const onNavButtonClick = useCallback((incremental: number) => {
		return () => {
			let index = targetIndex + incremental;
			index = index >= itemsLength ? infinite ? 0 : itemsLength - 1 : (index < 0 ? itemsLength - 1 : index);
			onDotClick(index)();
		};
	}, [infinite, itemsLength, onDotClick, targetIndex]);

	const { className: slideClassName, style: slideStyle, ...slideRest } = slideProps;

	useEffect(() => {
		if (autoplay) {
			const interval = setInterval(() => {
				setCount(prev => {
					if (prev === 99) {
						if (((targetIndex + 1 < itemsLength) && autoplay) || infinite) {
							onNavButtonClick(1)();
							return 0;
						}
						clearInterval(interval);
					}
					return prev + 1;
				});
			}, slideDuration / 100);
			return () => clearInterval(interval);
		}
	}, [autoplay, infinite, itemsLength, onNavButtonClick, targetIndex]);

	useEffect(() => {
		onDotClick(0)();
	}, [items]);

	return (
		<div className={clsx(className, styles['carousel-wrapper'], 'relative')} {...rest}>
			<div className={clsx(styles.carousel)} style={{ '--duration': `${transitionDuration}ms` } as CSSProperties}>
				{items.map((n, index) => (
					<CSSTransition
						key={n + `_${index}`}
						in={index === targetIndex}
						timeout={transitionDuration}
						nodeRef={nodeRefs.current[index]}
						classNames={'slider'}
						unmountOnExit={unmountOnExit}
					>
						<div
							ref={nodeRefs.current[index]}
							style={{ backgroundImage: `url("${n}")`, ...slideStyle }}
							className={clsx(direction, styles['carousel-item'], slideClassName, 'relative top-0', { 'bg-cover': !contain, 'bg-contain bg-no-repeat': contain })}
							{...slideRest}
						/>
					</CSSTransition>
				))}
			</div>
			{children || (dots && !dotsSeparated) ? <div className={clsx(styles['carousel-content'], { [styles.overlay]: overlay })}>
				<div className='container'>
					{prefix}
				</div>
				<div className={clsx('container', { 'mb-[100px]': items.length === 0 })}>
					{children}
					{dots && !dotsSeparated && items.length > 1 && (
						<div className='mt-[22px] pt-[10px] hover:pt-[4px] flex gap-[8px] group transition-all'>
							{items.map((_, i) => (
								<ProgressBar
									determinate
									value={i <= targetIndex ? i === targetIndex ? !autoplay ? 100 : count : 100 : 0}
									key={i}
									onClick={onDotClick(i)}
									className={clsx('cursor-pointer transition-all hover:scale-y-105 group-hover:!h-[10px]')}
									style={i === targetIndex ? {
										'flex': `0 0 ${100 / itemsLength * 1.5}%`
									} : {
										'flex': 1
									}}
								/>
							))}
						</div>
					)}
				</div>
			</div> : undefined}
			{controls && items.length > 1 && (
				<div className={clsx(styles.controls)}>
					<button onClick={onNavButtonClick(-1)} className={clsx({ 'opacity-0': !autoplay && targetIndex === 0 })} disabled={!autoplay && targetIndex === 0} />
					<button className={clsx({ 'opacity-0': !autoplay && targetIndex === items.length - 1 })} onClick={onNavButtonClick(1)} disabled={!autoplay && targetIndex === items.length - 1} />
				</div>
			)}
			{dots && dotsSeparated && (
				<div className='mt-[22px] lg:flex gap-[8px] pt-[10px] hover:pt-[4px] transition-all group hidden'>
					{items.map((_, i) => (
						<ProgressBar
							variant="secondary"
							determinate
							value={i <= targetIndex ? i === targetIndex ? !autoplay ? 100 : count : 100 : 0}
							key={i}
							onClick={onDotClick(i)}
							className={clsx('cursor-pointer transition-all hover:scale-y-105 group-hover:!h-[10px]')}
							style={i === targetIndex ? {
								'flex': `0 0 ${100 / itemsLength * 1.5}%`
							} : {
								'flex': 1
							}}
						/>
					))}
				</div>
			)}

		</div>
	);
};