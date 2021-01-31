import React from 'react';
import { ShipNameProps } from './types';

function ShipName( props: ShipNameProps ) {
	const { diagram, name } = props;
	const fn = diagram.shipNameClickFunction
		? () => {
			diagram.shipNameClickFunction!( name );
		}
		: undefined;

	const className = 'ship-name' + (diagram.shipNameClickFunction ? '' : ' ship-name-disabled');

	return (
		<text
			className={className}
			x={props.x}
			y={props.y}
			onClick={fn}
		>
			{props.name}
		</text>
	);
}

export default ShipName;