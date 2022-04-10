import React from 'react';
import styles from './LoadingIcon.module.css';
import { ReactComponent as Icon } from '../../img/stub/loading-small.svg';

export default function LoadingIcon() {
	return (
		<div className={ styles.fixed }>
			<Icon
				className={ styles.loading }
				width="50"
				height="50"
			/>
		</div>
	)
}