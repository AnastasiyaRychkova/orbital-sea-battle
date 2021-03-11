import DiagramStateType from '../../lib/game/Diagram/DiagramInterface';
import cellStyles from './cell.module.css';
import diagramStyles from './diagram.module.css';
import classNames from 'classnames';

enum CellState {
	'off',
	'on',
	'hit',
	'miss',
};

export function makeCellClass( index: number, diagram: DiagramStateType ): string
{
	return classNames(
		cellStyles[ 'cell_' + CellState[ diagram.getCellState( index ) ] ],
		{
			[cellStyles.cell_last]: diagram.isLastShot( index ),
			[cellStyles.cell_selected]: diagram.isCellSelected( index ),
		},
	);
}

export function makeContainerClass( index: number, diagram: DiagramStateType ): string
{
	return classNames({
		container: true,
		container_selected: diagram.isContainerSelected( index ),
	});
}

export function makeShipNameClass( diagram: DiagramStateType ): string
{
	return classNames({
		[diagramStyles.ship_name]: true,
		[diagramStyles.ship_name_disabled]: diagram.shipNameClickFunction,
	});
}

export function makeShipClass( name: string, diagram: DiagramStateType ): string
{
	return classNames({
		ship: true,
		ship_selected: diagram.isShipSelected( name ),
	});
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

/**
 * Расчет координаты X корабля
 * @param column Индекс столбца (<=> главное квантовое число n - 1)
 * @param vertLine Расстояние от начала координат в контейнерах
 * @returns Координата X верхнего левого угла корабля
 */
export function getShipX( column: number, vertLine: number ): number
{
	// нумерация колонок 0
	return vertLine * CONTAINER_WIDTH + column * COLUMN_SPACING;
}

/**
 * Расчет координаты Y корабля
 * @param row Индекс строки {0-7}. Нумерация снизу-вверх.
 * @returns Координата Y верхнего левого угла корабля
 */
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
const NAME_X_OFFSET = -20;
const NAME_Y_OFFSET = 70;



export {
	CELL_WIDTH,
	CELL_HEIGHT,
	CONTAINER_WIDTH,
	CONTAINER_HEIGHT,
	COLUMN_SPACING,
	LINE_SPACING,
	NAME_X_OFFSET,
	NAME_Y_OFFSET,
}