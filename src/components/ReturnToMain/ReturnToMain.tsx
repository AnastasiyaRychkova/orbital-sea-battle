import React from 'react';
import { Link } from "react-router-dom";
import styles from './ReturnToMain.module.css';

export default function ReturnToMain()  {
	return (
		<Link to="/" className={ styles.return }>Return</Link>
	);
}