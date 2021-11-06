import React from 'react';
import { observer, inject } from "mobx-react";
import ToggleButton from './ToggleButton';
import type { QN } from './Store';
import {ToggleTheme, ToggleType} from './types'
import styles from './Volume.module.css';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';


interface IProps {
	values: string[],
	name?: string,
	storeKey?: QN,
	type: ToggleType,
	theme: ToggleTheme,
	width?: string,
	controller?: IGameFieldController,
}


function make( props: IProps ): JSX.Element[] {
	const res = [];
	let checkedValue = props.controller!.filter.getValue( props.storeKey! );
	if( checkedValue && props.storeKey === 's' )
		checkedValue = checkedValue === '1' ? '+1/2' : '-1/2';

	for( let i = props.values.length - 1; i >= 0; i-- ) {
		res.push(
			<ToggleButton
				value={props.values[i]}
				toggleName={props.name!}
				type={props.type}
				theme={props.theme}
				checked={props.values[i] === checkedValue}
				key={props.values[i]}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					props.controller!.filter.setValue( props.storeKey!, e.target.value );
				}} />
		);
	}
	return res;
}

const Volume = inject( "controller" )(observer(( props: IProps ) =>
	<div className={styles.scale} style={{width: props.width || 'auto'}}>
		{
			( props.name === undefined || props.storeKey === undefined ) ?
				<span>Missing parameters 'name' and 'storeKey'</span> :
				make( props )
		}
	</div>
));

export default Volume;