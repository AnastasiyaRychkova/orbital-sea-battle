import React, {FC} from 'react';
import { observer, inject } from "mobx-react";
import cn from '../../className';
import { ToggleTheme } from '../types';

import ToggleButton from '../ToggleButton';
import styles from './InputValue.module.css';

import FilterType from "../../../core/game/Diagram/Filter/FilterInterface";
import IQuantumNumber from '../../../core/game/ChemicalElement/QuantumNumberInterface';


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
	const currentValueStr = filter.getValueAsString( key );
	const min = filter.minValid( key );
	const max = filter.maxValid( key );
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
				className={cn( styles, ['titleBlock', currentValueStr ? '' : 'undefined'] )}
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
						{currentValueStr || '..'}
					</span>
				</div>
			</label>

			<ul className={styles.body}>
				{ make( values, filter, key, min, max ) }
			</ul>
		</div>
	);
} ));



function make(
	values: IQuantumNumber[],
	filter: FilterType,
	key: StoreKey,
	min: number,
	max: number
): JSX.Element[]
{
	const checkedValue = filter.getValue( key );

	return values.map( ( btnValue ) =>

		<li className={styles.toggleBtn} key={btnValue.value}>
			<ToggleButton
				value={btnValue.toString()}
				toggleName={key}
				theme={ToggleTheme.squareL}
				checked={btnValue.value === checkedValue}
				invalid={btnValue.value < min || btnValue.value > max}
				onChange={
					(e: React.ChangeEvent<HTMLInputElement>) => {
						filter.setValue( key, e.target.value );
					}
				}
			/>
		</li>
	)
}

export default InputValue;