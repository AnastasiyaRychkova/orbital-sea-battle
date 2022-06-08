import React from 'react';
import styles from './FillingPanel.module.css';
import icons from '../../style/icons.module.css';
import texts from '../../style/text.module.css';
import { useTranslation } from 'react-i18next';

import sprite from "../../img/sprite.svg";

interface IProps {
	/** Теукщий режим заполнения */
	mode: "cell" | "block",

	/** Функция для изменения режима */
	change: () => void,
}

export default function FillingPanel( props: IProps ) {
	const { t } = useTranslation();

	const cellMode = props.mode === "cell";

	return (
		<div className = { styles["filling-mode-selection"] } >
			
			<span> { t("components.filling.text") } </span>
			
			<div className = { styles["select-switch"] } >
				
				<button
					className = {
						styles["button-icon"] + " " +
						styles["select-switch__button"] + " " +
						(
							cellMode
							? styles["button-tertiary"]
							: styles["selected"]
						) 
					}
					onClick = { cellMode ? props.change : undefined }
					style = { (cellMode) ? {} : { cursor: "default" } }
				>
					<svg
						className = { icons["icon-mini-tiny"] }
						xmlns="http://www.w3.org/2000/svg"
					>
						<use href = { sprite + "#ship" } />
					</svg>
					<span className = { texts["text-button-B-Normal"] }>
						{ t("components.filling.ships") }
					</span>
				</button>
				
				<button
					className = {
						styles["button-icon"] + " " +
						styles["select-switch__button"] + " " +
						(
							cellMode
							? styles["selected"]
							: styles["button-tertiary"]
						) 
					}
					onClick = { cellMode ? undefined : props.change }
					style = { (cellMode) ? { cursor: "default" } : {} }
				>
					<svg
						className = { icons["icon-mini-tiny"] }
						xmlns="http://www.w3.org/2000/svg"
					>
						<use href = { sprite + "#ballons-wide" } />
					</svg>
					<span className = { texts["text-button-B-Normal"] }>
						{ t("components.filling.items") }
					</span>
				</button>
			</div>
		</div>
	);
}
