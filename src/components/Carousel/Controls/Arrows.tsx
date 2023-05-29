import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { IconButton } from '../../Button/IconButton/Button';
import type { Carousel } from '../Carousel';
import styles from '../Slider.module.scss';

interface ArrowsProps {
	controller: Carousel;
};


export const Arrows: FC<ArrowsProps> = observer( ( {
	controller,
} ) => {
	return (
		<div className={styles.arrows}>
			<IconButton
				className={`${styles.arrow} ${styles.arrow_left}`}
				glyph="chevron"
				onClick={() => controller.left()}
			/>
			<IconButton
				className={styles.arrow}
				glyph="chevron"
				onClick={() => controller.right()}
			/>
		</div>
	);
} );
