import React, { FC } from 'react';
import { SlideImage } from './SlideImage';
// import SlideTitle from './SlideTitle';
import type { CarouselImage } from '../Carousel';

import styles from '../Slider.module.scss';

interface SlideProps {
	slide: CarouselImage<unknown>;
};


export const Slide: FC<SlideProps> = ( { slide } ) => {
	return (
		<div className={styles.slide}>
			<SlideImage src={slide.src}
				alt={slide.title}
			/>
			{/* <SlideTitle title={title} /> */}
		</div>
	);
};

