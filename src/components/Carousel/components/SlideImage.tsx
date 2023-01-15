import React, { FC } from 'react';
import type { URL } from 'types/primitive';

import styles from '../Slider.module.scss';

interface SlideImageProps {
	src: URL,
	alt: string,
};


export const SlideImage: FC<SlideImageProps> = ( { src, alt } ) => {
	return (
		<img 
			className={styles.slideImage}
			src={src}
			alt={alt}
		/>
	);
};
