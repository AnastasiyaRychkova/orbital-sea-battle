import React from 'react';
import { observer, inject } from "mobx-react";
import ToggleButton from './ToggleButton';
import type { QN } from './Store';
import {ToggleTheme, ToggleType} from './types'
import styles from './Volume.module.css';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';


interface IProps {
	values: string[],
	name: string,
	storeKey: QN,
	type: ToggleType,
	theme: ToggleTheme,
	width?: string,
	controller?: IGameFieldController,
}

function make( props: IProps ): JSX.Element[] {
	const res = [];
	const checkedValue = props.controller!.filter.getValue( props.storeKey );

	for( let i = props.values.length - 1; i >= 0; i-- ) {
		res.push(
			<ToggleButton
				value={props.values[i]}
				toggleName={props.name}
				type={props.type}
				theme={props.theme}
				checked={props.values[i] === checkedValue}
				key={props.values[i]}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const value = props.type === ToggleType.checkbox
								&& e.target.value === checkedValue 
									? undefined
									: e.target.value;
					props.controller!.filter.setValue( props.storeKey, value );
				}} />
		);
	}
	return res;
}

const Volume = inject( "controller" )(observer(( props: IProps ) =>
	<div className={styles.scale} style={{width: props.width || 'auto'}}>
		{ make( props ) }
	</div>
));

export default Volume;