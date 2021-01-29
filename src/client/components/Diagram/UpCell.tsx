import React from 'react';
import { makeCellClass } from './properties';
import type { CellProps } from './types';
import './cell.css';

function UpCell( props: CellProps ) {
	const fn = () => {
		props.clickFn && props.clickFn( props.schema.index );
	};

	return (
		<use href="#cell" className={makeCellClass(props.schema)} x={props.x} y={props.y} key={props.schema.index} onClick={fn} />
	);
}

export default UpCell;