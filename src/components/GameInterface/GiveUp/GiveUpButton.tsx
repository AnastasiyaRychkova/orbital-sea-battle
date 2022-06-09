import React from 'react';
import styles from './GiveUpButton.module.css';
import buttons from '../Buttons.module.css';
import icons from '../../../style/icons.module.css';
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
			className = { buttons["button-icon"] + " " + styles["button-exit"] }
		>
			<svg
				width = "20"
				height = "20"
				className = { icons["icon-tiny"] } // "icon-primary"
			>
				<use href = { sprite + "#exit" } />
			</svg>
			<span>
				{ t("actions.giveup") }
			</span>
		</button>
	);
}
