import React, { ReactChildren } from 'react';
import { observer, inject } from "mobx-react";
import styles from './style.module.css';
import Switcher from './Switcher';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';

interface IProps {
	name: string,
	sub?: string,
	withSwitcher: boolean,
	storeKey: 'n'|'l'|'m'|'s',
	children: React.ReactNode,
	controller?: IGameFieldController,
}


function injectProps( children: React.ReactNode, props: Object )
{
	return React.Children.map( children, child => {
		if( React.isValidElement( child ) )
			return React.cloneElement(child, { ...props } );
	}
	);
}


const InputValue = inject( "controller" )(observer(( props: IProps ) => {
	const filter = props.controller!.filter;
	return (
		<fieldset className={styles.inputValue} data-switch-on={!filter.isDisable( props.storeKey )}>
			<span className={styles.name}>
				{props.name}
				{props.sub ? <sub className={styles.sub}>{props.sub}</sub> : ''}
			</span>
			<div className={styles.row}>
				{props.withSwitcher
					? <Switcher
						id={'qn-switcher-' + props.storeKey}
						switchOn={false}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							filter.setDisable( props.storeKey, !e.target.checked );
						}} />
					: ''
				}
				{injectProps( props.children, {
					name: props.name,
					storeKey: props.storeKey,
				})}
			</div>
		</fieldset>
	)
	}
));

export default InputValue;