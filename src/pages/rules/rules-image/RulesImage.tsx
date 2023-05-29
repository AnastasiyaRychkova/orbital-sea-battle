import React, { FC } from 'react';
import cn from 'classnames';
import styles from './RulesImage.module.scss';

export const RulesImage: FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ( {
	id = Math.random().toString(),
	alt = '',
	className,
	...props
} ) => {
	return (
		<figure
			className={cn( styles.root, className )}
			aria-labelledby={id}
		>
			<img
				{...props}
				alt={alt}
			/>
			<figcaption
				id={id}
				className="text-normal"
			>
				{alt}
			</figcaption>
		</figure>
	);
};
