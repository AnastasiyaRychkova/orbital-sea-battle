import React, { useEffect, FC } from 'react';
import cn from 'classnames';

import { Arrows } from './Controls/Arrows';
import { SlidesList } from './components/List';
import { Dots } from './Controls/Dots';

import type { Carousel } from './Carousel';
import type { Milliseconds } from 'types/primitive';
import styles from './Slider.module.scss';




interface SliderProps {
	controller: Carousel,
	width?: string | number,
	height?: string | number,
	autoPlay?: boolean,
	autoPlayTime?: Milliseconds,
	className?: string,
};



export const Slider: FC<SliderProps> = ( {
	controller,
	autoPlay = false,
	autoPlayTime = 5000,
	className
} ) => {

	useEffect( () => {
		if ( !autoPlay ) {
			return;
		}
		const interval = setInterval( () => {
			controller.right();
		}, autoPlayTime );

		return () => {
			clearInterval( interval );
		};
	}, [autoPlay, autoPlayTime, controller] );


	return (
		<div
			className={cn( styles.slider, className )}
			onTouchStart={controller.handleTouchStart}
			onTouchMove={controller.handleTouchMove}
			onTouchEnd={controller.handleTouchEnd}
		>
			<Arrows controller={controller} />
			<SlidesList controller={controller} />
			<Dots controller={controller} />
		</div>
	);
};

