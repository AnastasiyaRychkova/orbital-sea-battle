import React from 'react';
import { ShipNameProps } from './types';

function ShipName( props: ShipNameProps ) {
	let className = 'ship-name';
	// let clickFn: () => void | undefined;
	const clickFn = () => console.log('click');
	if( props.clickFn )
	{
		className += '_ship-name-disabled';
		/* clickFn = () => {
			props.clickFn( props.schema.firstCellIndex, props.schema.length );
		} */
	}
	return (
		<text className="" x={props.x} y={props.y} onClick={clickFn} >{props.schema.name}</text>
	);
}

export default ShipName;