import React from 'react';
import styles from './Body.module.css';

interface IProps {
	children: React.ReactNode;
}

export default function Body( props: IProps ) {
	return (
		<div className={ styles.body2 } >
			{ props.children }
		</div>
	);
}