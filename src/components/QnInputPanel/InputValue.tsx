import React from 'react';
import { observer, inject } from "mobx-react";

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
	values: string[],

	/** Стиль кнопок */
	theme: ToggleTheme,

	/** Пробрасываемый через провайдер контроллер */
	controller?: ControllerType,
}



const InputValue = inject( "controller" )(observer(( props: IProps ) => {
	const filter = props.controller!.filter;
	const isFilterEnabled = !filter.isDisable( props.storeKey );
	return (
		<div
			className={styles.inputValue}
			data-switch-on={isFilterEnabled}
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
				{ make( props ) }
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
}: IProps ): JSX.Element[]
{
	const filter = controller!.filter;
	let checkedValue = filter.getValue( key );

	return values.map( ( value ) =>

		<li key={value}>
			<ToggleButton
				value={value}
				toggleName={key}
				theme={theme}
				checked={value === checkedValue}
				onChange={
					(e: React.ChangeEvent<HTMLInputElement>) => {
						filter.setValue( key, e.target.value );
					}
				} />
		</li>
	);
}



export default InputValue;