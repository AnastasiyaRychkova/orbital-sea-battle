import React, { useRef } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselImage } from 'components/Carousel/Carousel';

import { Slider } from 'components/Carousel/Slider';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';
import style from './Rules.module.scss';

type SlideDescription = string;


const Rules = observer( () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing.rules' } );
	const slides = Array.from( {length: 5} ).map( ( _, index ) => ( {
		title: `${index + 1}.title`,
		src: '/img/landing/pic.jpg',
		meta: `${index + 1}.description`,
	} as CarouselImage<SlideDescription> ) );
	const { current: carousel } = useRef( new Carousel( slides ) );
	const current = slides[ carousel.currentIndex ];

	return (
		<section id="rules"
			className={style.section}
		>
			<div className={style.header}>
				<h1 className="header-2">
					{t( 'header' )}
				</h1>
				<span className="header-5 bold">
					{t( 'subheader' )}
				</span>
			</div>
			<div className={style.content}>
				<Slider
					controller={carousel}
					autoPlay
					autoPlayTime={5000}
					className={style.manual}
				/>
				<span className={style['slide-number']}>
					{carousel.currentIndex + 1}
				</span>
				<ButtonWithIcon
					className={style.action}
					value={t( 'action' )}
					glyph="info"
					priority="tertiary"
					to="/rules"
					inNewTab
				/>
				<div className={cn(
					'long-medium',
					style.description
				)}
				>
					{t( current.meta || '' )}
				</div>
			</div>
		</section>
	);
} );

export default Rules;
