import React from 'react';
import { observer, inject } from "mobx-react";
import styles from './ConfirmButton.module.css';
import IFilter from '../../lib/game/Diagram/Filter/FilterInterface';

type ControllerType = {
	fire: () => void,
	filter: IFilter,
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