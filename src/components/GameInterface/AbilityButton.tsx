import React from 'react';
import styles from './GameInterface.module.css';
import button from './FullScreenButton.module.css';
import icons from '../../style/icons.module.css';

// import sprite from "../../img/sprite.svg";
import img from '../../img/components/ability.svg'

interface IProps {
	/** Функция по нажатию */
	onClick: () => void,
}

export default function AbilityButton( props: IProps ) {
	return (
		<button
			className = {
				button["button-content-center"]
				+ " " +
				styles["interface-icon-button"]
				+ " " +
				styles["icon-message"]		
			}
			onClick = { props.onClick }
		>
			<img
				src = { img }
				width = "20"
				height = "20"
				alt = ""
				className = { icons["icon-small"] + " " + icons["icon__color"] }
			/>
			{/* <svg ...> <use href = { sprite + "#message" } /> </svg> */}

		</button>
	);
}
