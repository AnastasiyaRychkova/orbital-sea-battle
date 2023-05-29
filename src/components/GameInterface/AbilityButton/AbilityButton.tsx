import React from 'react';
import styles from '../Buttons.module.css';
import Button from '../../Button/IconButton/Button';

interface IProps {
	/** Функция по нажатию */
	onClick: () => void,
}

export default function AbilityButton( props: IProps ) {
	return (
		<Button
			className = { styles.middle + " " + styles.ability }
			glyph = { "ability" }
			theme = { "backing" }
			onClick = { props.onClick }
			disabled
		/>
	);
}
