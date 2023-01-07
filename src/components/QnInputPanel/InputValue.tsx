import React from 'react';
import { observer } from 'mobx-react';

import ToggleButton from './ToggleButton';

import { ToggleTheme } from './types';
import type {
	IQuantumNumber,
	QNStrType,
} from '../../core/game/Chemistry/types';
import type { IFilter as FilterType } from '../../core/game/Diagram/types';
import styles from './InputValue.module.css';


type StoreKey = QNStrType;

interface IProps {
	/** Название, которе будет вынесено в подпись */
	name: string;

	/** Добавка к названию */
	sub?: string;

	/** Идентификатор */
	storeKey: StoreKey;

	/** Массив, содержащий строки названий кнопок */
	values: IQuantumNumber[];

	/** Стиль кнопок */
	theme: ToggleTheme;

	filter: FilterType;
}



const InputValue = observer( ( props: IProps ) => {
	const filter = props.filter;
	const isFilterDisabled = filter.isDisable( props.storeKey );
	const min = filter.minValid( props.storeKey );
	const max = filter.maxValid( props.storeKey );
	return (
		<div
			className={styles.inputValue}
			data-switch-off={isFilterDisabled}
		>
			<span className={styles.titleText}>
				{props.name}
				{props.sub && (
					<sub className={styles.titleSubText}>{props.sub}</sub>
				)}
			</span>

			<ul className={styles.row}>
				{make( props, isFilterDisabled, min, max )}
			</ul>
		</div>
	);
} );

function make(
	{ filter, storeKey: key, theme, values }: IProps,
	isFilterDisabled: boolean,
	min: number,
	max: number
): JSX.Element[] {
	let checkedValue = filter.getValue( key );

	return values.map( ( btnValue ) => (
		<li key={btnValue.value}>
			<ToggleButton
				value={btnValue.toString()}
				toggleName={key}
				theme={theme}
				checked={btnValue.value === checkedValue}
				disabled={isFilterDisabled}
				invalid={btnValue.value < min || btnValue.value > max}
				onChange={( e: React.ChangeEvent<HTMLInputElement> ) => {
					filter.setValue( key, e.target.value );
				}}
			/>
		</li>
	) );
}

export default InputValue;
