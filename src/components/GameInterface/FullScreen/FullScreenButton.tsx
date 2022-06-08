import React from 'react';
import styles from '../Buttons.module.css';
import icons from '../../../style/icons.module.css';

import sprite  from "../../../img/sprite.svg";

import Browser from "../../../core/browser/Browser"

function Click()
{
	Browser.fullScreen.toggle();
	// document.documentElement.requestFullscreen();
}

export default function FullScreenButton() {
	return (
		<button
			onClick = { Click }
			className = { styles["icon-scaling"] + " " + styles["button-content-center"] }
		>
			<svg
				role="presentation"
				width="20"
				height="20"
				className = { icons["icon-tiny"] + " " + icons["icon-stroke__color"]}
			>
					<use href = { sprite + "#scaling" } />
			</svg>
		</button>	
	);
}
