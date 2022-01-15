import React from 'react';
import { observer, inject } from "mobx-react";
import styles from './ConfirmButton.module.css';
import IDiagram from '../../lib/game/Diagram/DiagramInterface';

type ControllerType = {
	fire: () => void,
	diagram: IDiagram,
}

interface IProps {
	mobile?: boolean,
	controller?: ControllerType,
}

const ConfirmButton = inject( "controller" )(observer(( props: IProps ) => {
	return (
		<button
			className={makeClassName( props.mobile )}
			type="button"
			onClick={props.controller!.fire}
			disabled={!(props.controller!.diagram.observableState.doesSpecifyCell)}
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