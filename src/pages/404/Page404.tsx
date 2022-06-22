import React from 'react';
import styles from './Page404.module.css';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Default/Button';

export default function Page404() {
	const { t } = useTranslation();

	return (
		<div className={ styles.container }>
			<h1 className={ styles.title + " header-1 bold" }>
				{ t("pages.404.title") }
			</h1>
			<p className={ styles.subtitle + " text-normal" }>
				{ t("pages.404.text") }
			</p>
			<Button
				to="/"
				value={ t("actions.main") }
				priority="primary"
			/>
		</div>
	);
}
