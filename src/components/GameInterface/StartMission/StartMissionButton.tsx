import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './StartMissionButton.module.css';
import buttons from '../Buttons.module.css';
import texts from '../../../style/text.module.css';
import icons from '../../../style/icons.module.css';

import sprite from "../../../img/sprite.svg";

interface IProps {
	onClick: () => void,
}

/** Кнопка для начала миссии */
export default function SelectedElement( props: IProps ) {
	const { t } = useTranslation();
	
	return (
		<button
			className = {
				buttons["button-icon"] + " " +
				buttons["button-secondary-bright-fill"] + " " +
				styles["button-start-mission"]
			}
			onClick = { props.onClick }
		>
			<svg
				className = { icons["icon-small"] }
				xmlns="http://www.w3.org/2000/svg"
			>
				<use href = { sprite + "#play" }/>
			</svg>
			<span className = {
				texts["text-button-B-Medium"] + " " +
				texts["text-wrap"] + " " +
				styles["start-mission-text"] 
			} >
				{ t("actions.start") }
			</span> 
		</button>
	);
}
