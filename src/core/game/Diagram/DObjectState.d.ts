import {
	BlockQN,
	BoxQN,
	CellQN,
	MagneticQN,
	SpinQN,
} from "../Services/Chemistry";
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

	/** Был ли последний выстрел произведен в эту ячейку */
	isLastDamaged: boolean,

	readonly qn: CellQN,
} & DUnit;

export type BoxType = {
	readonly qn: BoxQN,
	children: {[key in SpinQNString]: CellType};
	getCell( s: string ): CellType | undefined,
} & DUnit;

export type BlockType = {
	readonly qn: BlockQN;
	children: {[key: string]: BoxType};
	getBox( m: string ): BoxType | undefined,
} & DUnit;

export type StateType = {
	getBlock( qn: BlockQN ): BlockType | undefined,
	getCell( qn: CellQN ): Cell | undefined,
	doesSpecifyCell: boolean,
	hasSpin( cell: CellQN ): boolean,
	isDamaged( qn: CellQN ): boolean,
}