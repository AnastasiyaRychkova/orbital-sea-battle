import React from 'react';
import { observer } from "mobx-react";
import styles from './ConfirmButton.module.css';
import type { IDiagramState } from '../../core/game/Diagram/types';
import type { CellQN } from '../../core/game/Chemistry/types';



interface IProps {
	mobile?: boolean,
	fireFn: ( cell: CellQN ) => void,
	diagram: IDiagramState,
}

const ConfirmButton = (observer(( props: IProps ) => {
	return (
		<button
			className={makeClassName( props.mobile )}
			type="button"
			onClick={() => {
				props.fireFn( props.diagram.filter?.state as CellQN );
				props.diagram.filter?.reset();
			}}
			disabled={!(props.diagram.doesSpecifyCell)}
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