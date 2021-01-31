import DiagramStateType from '../../../lib/game/Diagram/DiagramInterface';

enum CellState {
	'off',
	'on',
	'hit',
	'miss',
};

export function makeCellClass( index: number, diagram: DiagramStateType ): string
{
	let className = `cell_${CellState[diagram.getCellState( index )]}`;
	if( diagram.isLastShot( index ) )
		className += ' cell_last';
	if( diagram.isCellSelected( index ) )
		className += ' cell_selected';
	return className;
}

export function makeContainerClass( index: number, diagram: DiagramStateType ): string
{
	let className = 'cell-container';
	if( diagram.isContainerSelected( index ) )
		className += ' cell-container_selected';
	return className;
}

export function makeShipClass( name: string, diagram: DiagramStateType ): string
{
	let className = 'ship';
	if( diagram.isShipSelected( name ) )
		className += ' ship_selected';
	return className;
}

export function getDownCellIndexByUpCell( index: number ): number
{
	return index + 1;
}

export function getNextUpCellIndex( index: number ): number
{
	return index + 2;
}

/* export function calcColumnWidth( index: number ): number
{ // формула подогнана под последовательность 1 3 5 7 7 5 3
	// -|2x - 7| + 8
	return -Math.abs(2 * index - 7) + 8;
} */

export function getShipX( column: number, vertLine: number ): number
{
	// нумерация колонок 0
	return vertLine * CONTAINER_WIDTH + column * COLUMN_SPACING;
}

export function getShipY( row: number ): number
{
	return (7 - row) * (CONTAINER_HEIGHT + LINE_SPACING);
}

const CELL_WIDTH = 20;
const CELL_HEIGHT = 40;
const CONTAINER_WIDTH = 40;
const CONTAINER_HEIGHT = 40;
const COLUMN_SPACING = 40;
const LINE_SPACING = 30;
const NAME_OFFSET = -20;



export {
	CELL_WIDTH,
	CELL_HEIGHT,
	CONTAINER_WIDTH,
	CONTAINER_HEIGHT,
	COLUMN_SPACING,
	LINE_SPACING,
	NAME_OFFSET,
}