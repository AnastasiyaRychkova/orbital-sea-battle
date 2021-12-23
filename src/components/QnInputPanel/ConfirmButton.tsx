import React from 'react';
import { observer, inject } from "mobx-react";
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';
import styles from './ConfirmButton.module.css';

interface IProps {
	mobile?: boolean,
	controller?: IGameFieldController,
}

const ConfirmButton = inject( "controller" )(observer(( props: IProps ) => {
	return (
		<button
			className={makeClassName( props.mobile )}
			type="button"
			onClick={props.controller!.sendFunction}
			disabled={!(props.controller!.filter.doesSpecifyCell)}
		>
			<span className={styles.text}>
				Пуск
			</span>
		</button>
	)
}));

function makeClassName( mobile: boolean|undefined )
{
	return styles.button + ((mobile || false) ? (' '+styles.mobile) : '')
}

export default ConfirmButton;