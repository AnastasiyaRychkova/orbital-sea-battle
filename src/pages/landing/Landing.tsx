import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Landing.module.css';
import Button from '../../components/Button/Default/Button';

export default function Landing() {
	const { t } = useTranslation();
	
	return (
		<div className={ styles.content }>
			<h1 className={ styles.title }>
				{ t("title") }
			</h1>

			<span className={ styles.sub }>
				{ t("pages.landing.educational") }
			</span>

			<img
				src="/img/landing/pic.jpg"
				className={ styles.image }
				alt=""
			/>

			<Button
				to="play"
				value={ t("actions.play") }
				priority="primary"
				className={ styles.play }
			/>
		</div>
	);
}