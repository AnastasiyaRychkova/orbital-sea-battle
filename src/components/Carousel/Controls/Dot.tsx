import React, { FC } from 'react';
import cn from 'classnames';
import styles from '../Slider.module.scss';


interface DotProps {
	selected: boolean,
	onClick: () => void,
};

export const Dot: FC<DotProps> = ( {
	selected,
	onClick,
} ) => {
	return (
		<div
			className={cn(
				styles.dot,
				{ [styles.selected]: selected }
			)}
			onClick={onClick}
		/>
	);
};
