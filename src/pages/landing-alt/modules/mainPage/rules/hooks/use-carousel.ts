import { Carousel, CarouselImage } from 'components/Carousel/Carousel';
import { useRef } from 'react';

type SlideDescription = string;

export function useCarousel() {
	const slides = Array.from( {length: 5} ).map( ( _, index ) => ( {
		title: `${index + 1}.title`,
		src: `/img/landing/${index + 1}.png`,
		meta: `${index + 1}.description`,
	} as CarouselImage<SlideDescription> ) );
	const { current: carousel } = useRef( new Carousel( slides ) );
	const current = slides[ carousel.currentIndex ];

	return {
		carousel,
		current,
	}
};
