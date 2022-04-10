import React from 'react';
import styles from './Page404.module.css';
import { useTranslation } from 'react-i18next';

export default function Page404() {
	const { t } = useTranslation();

	return (
		<div className={ styles.container }>
			<h1 className={ styles.title }>
				{ t("pages.404.constuction") }
			</h1>
			<p className={ styles.subtitle }>
				{ t("pages.404.text") }
			</p>
		</div>
	);
}
