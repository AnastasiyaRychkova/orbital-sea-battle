import React, { FC } from 'react';
import { Slide } from './Slide';
import type { Carousel } from '../Carousel';

import styles from '../Slider.module.scss';
import { observer } from 'mobx-react';

interface SlidesListProps {
	controller: Carousel;
};


export const SlidesList: FC<SlidesListProps> = observer( ( {
	controller,
} ) => {
	const { currentIndex, slides } = controller;

	return (
		<div
			className={styles.slideList}
			style={{ transform: `translateX(-${currentIndex * 100}%)` }}
		>
			{slides.map( ( item, index ) => (
				<Slide key={index}
					slide={item}
				/>
			) )}
		</div>
	);
} );
