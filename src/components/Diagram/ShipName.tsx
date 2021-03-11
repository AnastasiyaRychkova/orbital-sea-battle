import React from 'react';
import { observer } from 'mobx-react';
import type { ShipNameProps } from './types';
import { makeShipNameClass } from './properties';

const ShipName = observer(( props: ShipNameProps ) => {
	const { diagram, name } = props;
	const fn = diagram.shipNameClickFunction
		? () => {
			diagram.shipNameClickFunction!( name );
		}
		: undefined;

	return (
		<text
			className={ makeShipNameClass( diagram ) }
			x={props.x}
			y={props.y}
			onClick={fn}
		>
			{props.name}
		</text>
	);
});

export default ShipName;