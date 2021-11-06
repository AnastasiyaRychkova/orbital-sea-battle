import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import {
	CELL_WIDTH,
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
} from './properties';
import Cell from './Cell';
import { ContainerQN, SpinQN } from '../../lib/game/ChemicalElement/QuantumNumbers';
import styles from './diagram.module.css';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';

interface IProps {
	x: number,
	y: number,
	qn: ContainerQN,
	controller?: IGameFieldController,
}


const Container = inject( "controller" )(observer(( props: IProps ) => {
	return (
		<g>
			<rect
				className={makeContainerClass( props )}
				x={props.x}
				y={props.y}
				width={CONTAINER_WIDTH}
				height={CONTAINER_HEIGHT}
				strokeWidth="1"
				fill="none"
			/>
			<Cell
				x={props.x + 2}
				y={props.y + 4}
				qn={{
					...props.qn,
					s: new SpinQN( 1 ),
				}}
			/>
			<Cell
				x={props.x + CELL_WIDTH - 2}
				y={props.y - 4}
				qn={{
					...props.qn,
					s: new SpinQN( -1 ),
				}}
			/>
		</g>
	);
}));


export default Container;



function makeContainerClass( props: IProps ): string
{
	return classNames({
		[styles.container]: true,
		[styles.containerSelected]: props.controller!.filter.isContainerSelected( props.qn ),
	});
}