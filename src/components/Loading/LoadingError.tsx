import React from 'react';
import styles from './LoadingError.module.css';
import circle from '../../img/stub/loading.svg'

import { useTranslation } from 'react-i18next';

export default function LoadingError() {
	const { t } = useTranslation();

	return (
		<div>
			<img
				className={ styles.loading }
				src={ circle }
				height="250"
				width="250"
				alt={ t("components.loading") }
			/>
		</div>
	)
}