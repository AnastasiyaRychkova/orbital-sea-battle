import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH
} from './properties';
import { EDiagramCellState as CellState } from '../../lib/game/ChemicalElement/DiagramCell';
import { CellQN } from '../../lib/game/ChemicalElement/QuantumNumbers';
import IDiagram from '../../lib/game/Diagram/DiagramInterface';
import IFilter from '../../lib/game/Diagram/Filter/FilterInterface';
import styles from './cell.module.css';

type ControllerType = {
	diagram: IDiagram,
	filter: IFilter,
}


interface IProps {
	x: number,
	y: number,
	qn: CellQN,
	controller?: ControllerType,
}


const Cell = inject( "controller" )(observer(( props: IProps ) =>
{
	/* const fn = () => {
			props.controller!.cellClickFunction( props.qn )
		}; */

	return (
		<use href="#cell"
			className={makeCellClass( props )}
			x={props.x}
			y={props.y}

			transform={props.qn.s && props.qn.s.value < 0
						? "rotate( 180 "+(props.x + (CONTAINER_WIDTH)/4)+" "+(props.y + (CONTAINER_HEIGHT)/2)+")"
						: "rotate(0)"}
		/>
	);
}));

export default Cell;



function makeCellClass( props: IProps ): string
{
	const {diagram, filter} = props.controller!;
	return classNames(
		styles[ CellState[ diagram.getCellState( props.qn ) ] ],
		{
			[styles.last]: diagram.isLastShot( props.qn ),
			[styles.selected]: filter.isCellSelected( props.qn ),
		},
	);
}
