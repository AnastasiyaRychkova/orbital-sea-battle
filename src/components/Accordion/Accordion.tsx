import React from 'react';
import styles from './Accordion.module.css';

interface IProps {
	title: string;
	open?: boolean;
	children: React.ReactNode
}

export default function Accordion(props: IProps)  {
	return (
		<details className={ styles.details } open={ props.open }>
			<summary className={ styles.button }><h2>{props.title}</h2></summary>
			{props.children}
		</details>
	);
}