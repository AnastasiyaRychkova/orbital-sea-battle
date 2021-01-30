import React from 'react';
import { Link } from "react-router-dom";
import styles from './MenuButton.module.css';

interface IProps {
	path: string;
	text: string;
}

export default function MenuButtonDisabled(props: IProps)  {
	return (
		<div className={ styles.disabled } >
			{ props.text }
		</div>
	);
}