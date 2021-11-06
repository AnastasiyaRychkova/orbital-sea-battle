import React from 'react';
import { observer, inject } from "mobx-react";
import styles from './SignButton.module.css';
import type { QN } from './Store';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';

interface IProps {
	name?: string,
	storeKey?: QN,
	label: string,
	width?: string,
	controller?: IGameFieldController,
}


const SignButton = inject( "controller" )(observer(( props: IProps ) => {
	if( props.name === undefined || props.storeKey === undefined )
		return (<span>Missing parameters 'name' and 'storeKey'</span>);

	const checked = props.controller!.filter.getValue( props.storeKey ) === '1';
	return (
		<div className={styles.container} style={{width: props.width || 'auto'}}>
			<input
				className={styles.input}
				id={props.name}
				name={props.name}
				type="checkbox"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					props.controller!.filter.setValue( props.storeKey!, e.target.checked ? '+1/2' : '-1/2' );
				}}
				checked={checked} />
			<label className={styles.button} htmlFor={props.name}>
				{checked ? '+' : '−'}
			</label>
			<span
				className={styles.label} >

				{props.label}

			</span>
		</div>
	);
}));


export default SignButton;