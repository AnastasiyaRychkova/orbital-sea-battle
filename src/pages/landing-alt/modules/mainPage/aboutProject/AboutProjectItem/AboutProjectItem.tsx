import React, { FC } from 'react';
import cn from 'classnames';
import styles from './AboutProjectItem.module.scss';

interface AboutProjectItemProps {
	prefix?: string;
	header: number | string;
	subheader: string;
	description: string;
}


export const AboutProjectItem: FC<AboutProjectItemProps> = ( {
	prefix,
	header,
	subheader,
	description,
} ) => {
	return (
		<div className={styles.element}>
			{prefix ? (
				<span className="header-4 bold">{`${prefix} `}</span>
			) : null}
			<span className="header-1 bold">{header}</span>
			<span className={cn( 'header-4 bold', styles['line-transfer'] )}>
				{subheader}
			</span>
			<p className="long-normal">{description}</p>
		</div>
	);
};
