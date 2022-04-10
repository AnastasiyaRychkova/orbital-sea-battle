import React from 'react';
import { useTranslation } from 'react-i18next';
// import styles from './Landing.module.css';

export default function Landing() {
	const { t } = useTranslation();
	
	return (
		<>
			<h1>{ t("title") }</h1>
		</>
	);
}