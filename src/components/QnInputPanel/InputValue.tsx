import React from 'react';
import { observer, inject } from "mobx-react";

import IQuantumNumber from '../../lib/game/ChemicalElement/QuantumNumberInterface';
import ToggleButton from './ToggleButton';
import styles from './InputValue.module.css';

import { ToggleTheme } from './types';
import FilterType from "../../lib/game/Diagram/Filter/FilterInterface";

type StoreKey = 'n'|'l'|'m'|'s';

type ControllerType = {

	filter: FilterType;
}


interface IProps {
	/** Название, которе будет вынесено в подпись */
	name: string,

	/** Добавка к названию */
	sub?: string,

	/** Идентификатор */
	storeKey: StoreKey,

	/** Массив, содержащий строки названий кнопок */
	values: IQuantumNumber[],

	/** Стиль кнопок */
	theme: ToggleTheme,

	/** Пробрасываемый через провайдер контроллер */
	controller?: ControllerType,
}



const InputValue = inject( "controller" )(observer(( props: IProps ) => {
	!props.controller && console.error( 'Filter(desktop).InputValue: controller is undefined' );
	const filter = props.controller!.filter;
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
				{props.sub
					&&
					<sub className={styles.titleSubText}>
						{props.sub}
					</sub>
				}
			</span>

			<ul className={styles.row}>
				{ make( props, isFilterDisabled, min, max ) }
			</ul>
		</div>
	)
	}
));


function make({
	controller,
	storeKey: key,
	theme,
	values,
}: IProps,
	isFilterDisabled: boolean,
	min: number,
	max: number ): JSX.Element[]
{
	const filter = controller!.filter;
	let checkedValue = filter.getValue( key );
	

	return values.map( ( btnValue ) =>

		<li key={btnValue.value}>
			<ToggleButton
				value={btnValue.toString()}
				toggleName={key}
				theme={theme}
				checked={btnValue.value === checkedValue}
				disabled={isFilterDisabled}
				invalid={btnValue.value < min || btnValue.value > max}
				onChange={
					(e: React.ChangeEvent<HTMLInputElement>) => {
						filter.setValue( key, e.target.value );
					}
				} />
		</li>
	);
}



export default InputValue;