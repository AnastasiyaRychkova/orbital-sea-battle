import React from 'react';
import DiagramStateType from '../../../lib/game/Diagram/DiagramInterface';
import Container from './Container';
import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
	getDownCellIndexByUpCell,
	getNextUpCellIndex,
	getShipX,
	getShipY,
	makeShipClass,
	NAME_OFFSET,
} from './properties';
import ShipName from './ShipName';
import { ShipProps } from './types';

type ShipSize = {
	firstCellIndex: number,
	length: number,
	x: number,
	y: number,
};

function buildShip( sizeProps: ShipSize,
					diagram: DiagramStateType,
): Array<JSX.Element>
{
	let {firstCellIndex: cellIndex, x} = sizeProps;
	const ship = [];

	for (let i = 0; i < sizeProps.length; i++) {		
		ship.push( <Container
			key={cellIndex}
			diagram={diagram}
			x={x}
			y={sizeProps.y}
			upCell={cellIndex}
			downCell={getDownCellIndexByUpCell( cellIndex )}
		/> );

		x += CONTAINER_WIDTH;
		cellIndex = getNextUpCellIndex( cellIndex );
	}
	return ship;
}


function Ship( props: ShipProps ) {
	const sizeProps = {
		...props.diagram.getShipPropsByName( props.name ),
		x: getShipX( props.column, props.vertLine ),
		y: getShipY( props.row ),
	};
	return (
		<g>
			{ buildShip( sizeProps, props.diagram ) }
			<ShipName
				diagram={props.diagram}
				x={sizeProps.x + NAME_OFFSET}
				y={sizeProps.y + CONTAINER_HEIGHT}
				name={props.name}
			/>
			<rect
				className={makeShipClass( props.name, props.diagram )}
				x={sizeProps.x}
				y={sizeProps.y}
				width={CONTAINER_WIDTH * sizeProps.length}
				height={CONTAINER_HEIGHT}
				fill="none"
			/>
		</g>
	);
}

export default Ship;