import React, { FC } from 'react';
import cn from 'classnames';
import { ToggleTheme } from './types';
import styles from './ToggleButton.module.css';

interface IProps {
	/** Надпись на кнопке */
	value: string;

	/** Идентификатор для группы кнопок */
	toggleName: string;

	/** Действие по нажатию на кнопку */
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;

	/** Визуальный стиль кнопки */
	theme: ToggleTheme;

	/** Выбрана ли она */
	checked?: boolean;

	/** Есть ли возможность на нее нажать */
	disabled?: boolean;

	invalid?: boolean;
}



const ToggleButton: FC<IProps> = ( {
	value,
	toggleName,
	onChange,
	theme = ToggleTheme.default,
	checked = false,
	disabled = false,
	invalid = false,
} ) => {
	const id = toggleName + '-' + value;
	return (
		<React.Fragment>
			<input
				className={styles.input}
				id={id}
				name={toggleName}
				value={value}
				type="checkbox"
				onChange={onChange}
				checked={checked}
				disabled={disabled}
			/>
			<label
				className={cn(
					styles.button,
					{ [styles.invalid]: invalid },
					getThemeClass( theme )
				)}
				htmlFor={id}
				role="button"
			>
				<span className={styles.text}>{value}</span>
			</label>
		</React.Fragment>
	);
};



function getThemeClass( theme: ToggleTheme ): string {
	switch ( theme ) {
		case ToggleTheme.default:
			return styles.thin;

		case ToggleTheme.squareM:
			return styles.square + ' ' + styles.squareM;

		default:
			return styles.square + ' ' + styles.squareL;
	}
}

export default ToggleButton;
