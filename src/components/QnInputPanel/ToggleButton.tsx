import React from 'react';
import styles from './ToggleButton.module.css';
import { ToggleTheme, ToggleType } from "./types";
import classNames from "classnames";

interface IProps {
	value: string,
	toggleName: string,
	type: ToggleType,
	theme: ToggleTheme,
	checked: boolean,
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void,

}

function getThemeClass( theme: ToggleTheme ): string
{
	switch( theme ) {
		case ToggleTheme.volume:
			return styles.volume;

		case ToggleTheme.default:
			return styles.thin;

		case ToggleTheme.squareM:
			return styles.square + ' '+ styles.squareM;

		default:
			return styles.square + ' '+ styles.squareL;
	}
}

function ToggleButton( props: IProps ) {
	const id = props.toggleName + '-' + props.value;
	return (
		<React.Fragment>
			<input
				className={styles.toggle}
				id={id}
				name={props.toggleName}
				value={props.value}
				type="checkbox"
				onChange={props.onChange}
				checked={props.checked} />
			<label
				className={classNames( styles.toggleBtn, getThemeClass( props.theme ) )}
				htmlFor={id} >

				{props.value}

			</label>
		</React.Fragment>
	);
}

ToggleButton.defaultProps = {
	checked: false,
}


export default ToggleButton;