import React from 'react';
import styles from '../Buttons.module.css';
import Button from '../../Button/IconButton/Button';

import Browser from "../../../core/browser/Browser";

function Click()
{
	Browser.fullScreen.toggle();
}

export default function FullScreenButton() {
	return (
		<Button
			className = { styles.small }
			glyph = { "full_screen" }
			theme = { "backing" }
			onClick = { Click }
		/>
	);
}
