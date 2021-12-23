import React, {FC} from 'react';
import { observer, inject } from "mobx-react";
import cn from '../../className';
import { ToggleTheme } from '../types';

import ToggleButton from '../ToggleButton';
import styles from './InputValue.module.css';

import FilterType from "../../../lib/game/Diagram/Filter/FilterInterface";


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

	/** Открыта ли вкладка */
	open: boolean,

	openTabHandle: ( key: StoreKey ) => void,

	/** Пробрасываемый через провайдер контроллер */
	controller?: ControllerType,
}

const InputValue: FC<IProps> = inject( "controller" )(observer( ({
	name,
	sub,
	values,
	storeKey: key,
	open,
	openTabHandle,
	controller,
}) => {
	const filter = controller!.filter;
	const currentValue = filter.getValue( key );
	return (
		<div className={styles.tab}>
			<input
				type="radio"
				name="filter"
				id={"filter-"+key}
				checked={open}
				onChange={() => openTabHandle( key )}
				disabled={filter.isDisable( key )}
			/>
			<label
				htmlFor={"filter-"+key}
				className={cn( styles, ['titleBlock', currentValue ? '' : 'undefined'] )}
			>
				<div className={styles.title}>
					<span className={styles.titleText}>
						{name}
						{sub ?
							<sub className={styles.titleSubText}>
								{sub}
							</sub>
							: ''
						}
					</span>
				</div>
				<div className={styles.value}>
					<span className={styles.valueText}>
						{currentValue || '..'}
					</span>
				</div>
			</label>

			<ul className={styles.body}>
				{ make( values, filter, key ) }
			</ul>
		</div>
	);
} ));



function make(
	values: string[],
	filter: FilterType,
	key: StoreKey
): JSX.Element[]
{
	const checkedValue = filter.getValue( key );

	return values.map( ( value ) =>

		<li className={styles.toggleBtn} key={value}>
			<ToggleButton
				value={value}
				toggleName={key}
				theme={ToggleTheme.squareL}
				checked={value === checkedValue}
				onChange={
					() => {
						filter.setValue( key, value );
					}
				}
			/>
		</li>
	)
}

export default InputValue;