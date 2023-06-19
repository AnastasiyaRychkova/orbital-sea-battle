import { Carousel, CarouselImage } from 'components/Carousel/Carousel';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type SlideDescription = string;

export function useCarousel() {
	const { i18n } = useTranslation();

	const { carousel, slides } = useMemo( () => {
		const imgSuffix = i18n.language !== 'ru' ? '_en' : '';
		const slides = Array.from( {length: 5} ).map( ( _, index ) => ( {
			title: `${index + 1}.title`,
			src: `/img/landing/${index + 1}${imgSuffix}.png`,
			meta: `${index + 1}.description`,
		} as CarouselImage<SlideDescription> ) );

		return {
			carousel: new Carousel( slides ),
			slides,
		};
	}, [ i18n.language ] );

	return {
		carousel,
		current: slides[ carousel.currentIndex ],
	}
};
