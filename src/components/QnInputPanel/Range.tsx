import React from 'react';
import { observer, inject } from "mobx-react";
import type { QN } from './Store';
import styles from './Range.module.css';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';


interface IProps {
	min: number,
	max: number,
	name: string,
	storeKey: QN,
	width: string,
	controller?: IGameFieldController,
}

function make( props: IProps ): JSX.Element[]
{
	const selected = Number( props.controller!.filter.getValue( props.storeKey ) );
	const res: JSX.Element[] = [];

	for( let i = props.min; i <= props.max; i++ ) {
		const label: string = i > 0
								? '+' + i.toString()
								: i.toString();

		res.push(
			<option
				className={styles.label}
				value={label}
				label={label}
				key={label}
				data-selected={i === selected} />
		);
	}
		
	return res;
}

const Range = inject( "controller" )(observer(( props: IProps ) =>
{
	const listId = props.name + "-tickmarks"
	return (
		<div className={styles.range} style={{width: props.width}}>
			<datalist className={styles.datalist} id={listId}>
				{make( props )}
			</datalist>

			<input
				className={styles.input}
				type="range"
				min={props.min}
				max={props.max}
				step="1"
				value={props.controller!.filter.getValue( props.storeKey )}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					props.controller!.filter.setValue( props.storeKey, e.target.value );
				}} />

		</div>
	);
}));

export default Range;