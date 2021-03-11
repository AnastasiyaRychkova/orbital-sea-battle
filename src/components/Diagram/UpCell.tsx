import React from 'react';
import { observer } from 'mobx-react';
import { makeCellClass } from './properties';
import type { CellProps } from './types';

const UpCell = observer(( props: CellProps ) => {
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
		/>
	);
});

export default UpCell;