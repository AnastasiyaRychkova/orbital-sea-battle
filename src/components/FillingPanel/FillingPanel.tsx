import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FillingPanel.module.css';
import sprite from "../../img/sprite.svg";

interface IProps {
	/** Текущий режим заполнения */
	mode: "cell" | "block",

	/** Функция для изменения режима */
	change: () => void,
}

export default function FillingPanel( props: IProps ) {
	const { t } = useTranslation();

	const cellMode = ( props.mode === "cell" );

	return (
		<div className = { styles.panel }>
			
			<span className = "text-normal" >
				{ t("components.filling.text") }
			</span>
			
			<div className = { styles.switch }>	
				<button
					className = { styles.toggle }
					disabled = { !cellMode }
					onClick = { cellMode ? props.change : undefined }
				>
					<svg xmlns="http://www.w3.org/2000/svg"
						className = { styles.icon }>
						<use href = { sprite + "#ship" } />
					</svg>
					<span className = "button-normal" >
						{ t("components.filling.ships") }
					</span>
				</button>
				
				<button
					className = { styles.toggle }
					disabled = { cellMode }
					onClick = { cellMode ? undefined : props.change }
				>
					<svg xmlns = "http://www.w3.org/2000/svg"
						className = { styles.icon }>
						<use href = { sprite + "#ballons-wide" } />
					</svg>
					<span className = "button-normal" >
						{ t("components.filling.items") }
					</span>
				</button>
			</div>
		</div>
	);
}
