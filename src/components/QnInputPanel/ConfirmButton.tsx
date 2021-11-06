import React from 'react';
import { observer, inject } from "mobx-react";
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';
import styles from './ConfirmButton.module.css';

interface IProps {
	controller?: IGameFieldController,
}

const ConfirmButton = inject( "controller" )(observer(( props: IProps ) => {
	return (
		<button
			className={styles.button}
			type="button"
			onClick={props.controller!.sendFunction}
			disabled={!props.controller!.filter.doesSpecifyCell()
		}>
			Пуск
		</button>
	)
}));

export default ConfirmButton;