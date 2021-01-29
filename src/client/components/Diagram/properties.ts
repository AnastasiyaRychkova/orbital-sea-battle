import type {
	CellSchema,
	ContainerSchema,
	ShipSchema,
} from './types';

export function makeCellClass( props: CellSchema ): string
{
	let className = `cell_${props.state}`;
	if( props.isLast )
		className += ' cell_last';
	if( props.isSelected )
		className += ' cell_selected';
	return className;
}

export function makeContainerClass( props: ContainerSchema ): string
{
	let className = 'container';
	if( props.isSelected )
		className += ' container_selected';
	return className;
}

export function getContainerKey( props: ContainerSchema ): string | number
{
	return props.upCell.index;
}

export function getShipKey( props: ShipSchema ): string | number
{
	return props.name;
}

const CELL_WIDTH = 20;
const CELL_HEIGHT = 40;
const CONTAINER_WIDTH = 40;
const CONTAINER_HEIGHT = 40;

export {
	CELL_WIDTH,
	CELL_HEIGHT,
	CONTAINER_WIDTH,
	CONTAINER_HEIGHT,
}