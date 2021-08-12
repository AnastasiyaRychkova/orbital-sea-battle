import React from 'react';
import { observer, inject } from "mobx-react";
import styles from './SignButton.module.css';
import type { QN } from './Store';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';

interface IProps {
	name: string,
	label: string,
	storeKey: QN,
	width?: string,
	controller?: IGameFieldController,
}


const SignButton = inject( "controller" )(observer(( props: IProps ) => {
	const checked = props.controller!.filter.getValue( props.storeKey ) === '1';
	return (
		<div className={styles.container} style={{width: props.width || 'auto'}}>
			<input
				className={styles.input}
				id={props.name}
				name={props.name}
				type="checkbox"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					props.controller!.filter.setValue( props.storeKey, e.target.checked ? '1' : '-1' );
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