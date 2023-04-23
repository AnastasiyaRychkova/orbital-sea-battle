import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useCarousel } from './hooks/use-carousel';
import { Slider } from 'components/Carousel/Slider';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';
import style from './Rules.module.scss';


const Rules = observer( () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing.rules' } );
	const { carousel, current } = useCarousel();

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
