import React from 'react';
import styles from './Page404.module.css';
import LoadingCircle from './LoadingCircle'
import ReturnToMain from '../../components/ReturnToMain/ReturnToMain'

interface IProps {
	title?: string;
}

export default function Page404( {title = "Ошибка 404"}: IProps) {
	return (
		<div className={ styles.container }>
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.subtitle}>Page Not Found</p>
			<LoadingCircle />
			<ReturnToMain />
		</div>
	);
}