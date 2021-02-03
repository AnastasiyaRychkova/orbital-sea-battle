import type DiagramStateType from '../../lib/game/Diagram/DiagramInterface'

// ---- CELL ------

export enum CellState
{
	off,
	on,
	hit,
	miss,
};

export type CellProps = {
	diagram: DiagramStateType,
	x: number,
	y: number,
	index: number,
};


// ---- CONTAINER ------

export type ContainerProps = {
	diagram: DiagramStateType,
	x: number,
	y: number,
	upCell: number,
	downCell: number,
};


// ---- SHIP NAME ------

export type ShipNameProps = {
	diagram: DiagramStateType,
	x: number,
	y: number,
	name: string,
};


// ---- SHIP ------

export type ShipProps = {
	diagram: DiagramStateType,
	column: number,
	row: number,
	vertLine: number,
	name: string,
};
