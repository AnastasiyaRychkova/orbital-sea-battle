import type IDiagram from '../../core/game/Diagram/DiagramInterface'

// ---- CELL ------

export enum CellState
{
	off,
	on,
	miss,
	hit,
};

export type Coordinates = {
	x: number,
	y: number,
};

export type CellProps = {
	diagram: IDiagram,
	x: number,
	y: number,
	index: number,
	isDown?: boolean,
};


// ---- CONTAINER ------

export type ContainerProps = {
	diagram: IDiagram,
	x: number,
	y: number,
	upCell: number,
	downCell: number,
};


// ---- SHIP NAME ------

export type ShipNameProps = {
	diagram: IDiagram,
	x: number,
	y: number,
	name: string,
};


// ---- SHIP ------

export type ShipProps = {
	diagram: IDiagram,
	column: number,
	row: number,
	vertLine: number,
	name: string,
};
