import React from 'react';
import { observer } from 'mobx-react';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH, makeCellClass } from './properties';
import type { CellProps } from './types';
import './cell.css';

const DownCell = observer(( props: CellProps ) => {
	const {index, diagram} = props;
	const fn = diagram.cellClickFunction
		? () => {
			diagram.cellClickFunction!( index )
		}
		: undefined;
	return (
		<use href="#cell"
			className={makeCellClass( index, diagram )}
			x={props.x}
			y={props.y}
			onClick={fn}
			transform={"rotate( 180 "+(props.x + (CONTAINER_WIDTH)/4)+" "+(props.y + (CONTAINER_HEIGHT)/2)+")"}
		/>
	);
});

export default DownCell;