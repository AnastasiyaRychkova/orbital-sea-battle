import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Dot } from './Dot';
import type { Carousel } from '../Carousel';
import styles from '../Slider.module.scss';

interface DotsProps {
	controller: Carousel;
};


export const Dots: FC<DotsProps> = observer( ( {
	controller,
} ) => {
	const renderDots = () => {
		const dots = [];
		for ( let i = 0; i < controller.size; i++ ) {
			dots.push(
				<Dot key={`dot-${i}`}
					selected={i === controller.currentIndex}
					onClick={() => controller.toSlide( i )}
				/>
			);
		}

		return dots;
	};

	return (
		<div className={styles.dots}>
			{renderDots()}
		</div>
	);
} );
