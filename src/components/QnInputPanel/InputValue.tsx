import React from 'react';
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
	const isFilterEnabled = !filter.isDisable( props.storeKey );
	return (
		<fieldset
			className={styles.inputValue}
			data-switch-on={isFilterEnabled}
		>
			<span className={styles.name}>
				{props.name}
				{props.sub
					?
					<sub className={styles.sub}>
						{props.sub}
					</sub>
					:
					''
				}
			</span>
			<div className={styles.row}>
				{props.withSwitcher
					? <Switcher
						id={'qn-switcher-' + props.storeKey}
						switchOn={isFilterEnabled}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							filter.setDisable( props.storeKey, !e.target.checked ); // isFilterEnabled
						}} />
					: ''
				}
				{injectProps( props.children, {
					name: props.name + (props.sub ? props.sub : ''),
					storeKey: props.storeKey,
				})}
			</div>
		</fieldset>
	)
	}
));

export default InputValue;