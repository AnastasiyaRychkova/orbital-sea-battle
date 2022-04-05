import {
	ShipQN,
	ContainerQN,
	CellQN,
	MagneticQN,
	SpinQN,
} from "../ChemicalElement/QuantumNumbers";
import IFilter from "./Filter/FilterInterface";


export type DEnvironment = {
	filter?: IFilter,
	highlight?: IFilter,
}




type DUnit = {
	filtered: boolean;
	highlighted: boolean;
};

export type SpinQNString = '+1/2'|'−1/2';

export type CellType = {

	/** Отмечен ли игроком */
	selected: boolean,

	/** Был ли совершен в него выстрел */
	damage: boolean,

	readonly qn: CellQN,
} & DUnit;

export type BoxType = {
	readonly qn: ContainerQN,
	children: {[key in SpinQNString]: CellType};
	getCell( s: string ): CellType | undefined,
} & DUnit;

export type BlockType = {
	readonly qn: ShipQN;
	children: {[key: string]: BoxType};
	getBox( m: string ): BoxType | undefined,
} & DUnit;

export type StateType = {
	getBlock( n: string, l: string ): BlockType | undefined,
	getCell( qn: CellQN ): Cell | undefined,
	doesSpecifyCell: boolean,
}