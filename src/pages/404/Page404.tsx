import React from 'react';
import styles from './Page404.module.css';
// import ReturnToMain from '../../components/ReturnToMain/ReturnToMain'
import circle from '../../img/stub/loading.svg'

function LoadingCircle() {
	return (
		<div className={ styles.loading }>
			<img src={ circle } height="250" width="250" alt="Загрузка" />
		</div>
	)
}

interface IProps {
	title?: string;
}

export default function Page404( { title = "Error 404" } : IProps ) {
	return (
		<div className={ styles.container }>
			<h1 className={ styles.title }>{ title }</h1>
			<p className={ styles.subtitle }>Page Not Found</p>
			<LoadingCircle />
			{/* <ReturnToMain /> */}
		</div>
	);
}