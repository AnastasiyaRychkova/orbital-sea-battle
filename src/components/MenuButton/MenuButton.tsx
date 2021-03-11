import React from 'react';
import { Link } from "react-router-dom";
import styles from './MenuButton.module.css';

interface IProps {
	path: string;
	children: React.ReactNode;
}

export default function MenuButton(props: IProps) {
	return (
		<Link to={ props.path } className={ styles.choose } >
			{ props.children }
		</Link>
	);
}