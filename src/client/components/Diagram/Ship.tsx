import React from 'react';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from './properties';
import { ShipProps } from './types';

function Ship( props: ShipProps ) {
	return (
		<g>
			{ props.children }
			<rect className="ship-stroke" x={props.x} y={props.y} width={CONTAINER_WIDTH * props.schema.length} height={CONTAINER_HEIGHT} fill="none" />
		</g>
	);
}

export default Ship;