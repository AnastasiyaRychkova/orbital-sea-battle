// ---- CELL ------

export enum CellState
{
	off,
	on,
	hit,
	miss,
};

export type CellSchema = {
	index: number,
	state: CellState,
	isLast: boolean,
	isSelected: boolean,
};

export type CellProps = {
	schema: CellSchema,
	x: number,
	y: number,
};


// ---- CONTAINER ------

export type ContainerSchema = {
	upCell: CellSchema,
	downCell: CellSchema,
	isSelected: boolean,
};

export type ContainerProps = {
	schema: ContainerSchema,
	x: number,
	y: number,
	cellClickFn?: ( index: number ) => void,
	children: any,
};


// ---- SHIP NAME ------

export type ShipNameSchema = {
	firstCellIndex: number,
	length: number,
	name: string,
};

export type ShipNameProps = {
	schema: ShipNameSchema,
	x: number,
	y: number,
	clickFn?: ( firstCellIndex: number, length: number ) => void,
};


// ---- SHIP ------

export type ShipSchema = {
	name: string,
	cells: Array<CellSchema>,
	length: number,
	isSelected: boolean,
	cellClickFn?: ( index: number ) => void,
	nameClickFn?: ( firstCellIndex: number, length: number ) => void,
};

export type ShipProps = {
	schema: ShipSchema,
	x: number,
	y: number,
	children: any,
};


export type DiagramStoreType = {

}