import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH
} from './properties';
import { EDiagramCellState as CellState } from '../../lib/game/ChemicalElement/DiagramCell';
import { CellQN } from '../../lib/game/ChemicalElement/QuantumNumbers';
import styles from './cell.module.css';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';


interface IProps {
	x: number,
	y: number,
	qn: CellQN,
	controller?: IGameFieldController,
}


const Cell = inject( "controller" )(observer(( props: IProps ) =>
{
	const fn = () => {
			props.controller!.cellClickFunction( props.qn )
		};

	return (
		<use href="#cell"
			className={makeCellClass( props )}
			x={props.x}
			y={props.y}
			onClick={fn}
			transform={props.qn.s && props.qn.s.value < 0
						? "rotate( 180 "+(props.x + (CONTAINER_WIDTH)/4)+" "+(props.y + (CONTAINER_HEIGHT)/2)+")"
						: "rotate(0)"}
		/>
	);
}));

export default Cell;



function makeCellClass( props: IProps ): string
{
	return classNames(
		styles[ CellState[ props.controller!.getCellState( props.qn ) ] ],
		{
			[styles.last]: props.controller!.isLastShot( props.qn ),
			[styles.selected]: props.controller!.filter.isCellSelected( props.qn ),
		},
	);
}
