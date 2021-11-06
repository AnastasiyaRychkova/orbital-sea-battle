import React from 'react';
import styles from './MenuButton.module.css';

interface IProps {
	path: string;
	children: React.ReactNode;
}

export default function MenuButtonDisabled(props: IProps)  {
	return (
		<div className={ styles.disabled } >
			{ props.children }
		</div>
	);
}