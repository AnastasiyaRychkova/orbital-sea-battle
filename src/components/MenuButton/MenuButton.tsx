import React from 'react';
import { Link } from "react-router-dom";
import styles from './MenuButton.module.css';

interface IProps {
	path: string;
	text: string;
}

export default function MenuButton(props: IProps)  {
	return (
		<Link to={ props.path } className={ styles.choose } >
			{ props.text }
		</Link>
	);
}