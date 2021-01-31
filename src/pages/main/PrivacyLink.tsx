import React from 'react';
import { Link } from "react-router-dom";
import bottom_line from '../../img/main/bottom_line.png'
import styles from './PrivacyLink.module.css';

export default function PrivacyLink()  {
	return (
		<footer className={ styles.privacy }>
			<img src={ bottom_line } />
			<Link to="/privacy" className={ styles.button }>Политика конфиденциальности</Link>
		</footer>
	);
}