import React from 'react';
import styles from './GiveUpButton.module.css';
import { useTranslation } from 'react-i18next';

import sprite from "../../../img/sprite.svg";

interface IProps {
	/** Функция по нажатию */
	onClick: () => void,
}

export default function GiveUpButton( props: IProps ) {
	const { t } = useTranslation();

	return (
		<button
			onClick = { props.onClick }
			className = { styles.button + " " + styles.box }
		>
			<svg
				width = "20"
				height = "20"
				className = { styles.icon }
			>
				<use href = { sprite + "#exit" } />
			</svg>
			<span className = "button-normal">
				{ t("actions.giveup") }
			</span>
		</button>
	);
}
