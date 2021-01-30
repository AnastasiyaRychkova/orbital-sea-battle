import React from 'react';
import styles from './LoadingCircle.module.css';
import circle from '../../img/stub/loading.svg'

export default function LoadingCircle() {
	return (
		<div className={ styles.loading }>
			<img src={ circle } alt="Загрузка" />
		</div>
	)
}