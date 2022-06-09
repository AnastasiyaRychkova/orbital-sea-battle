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
	root: IDiagramState,
}




interface DUnit {
	filtered: boolean;
	highlighted: boolean;
};

export type SpinQNString = '+1/2'|'−1/2';

export interface ICell extends DUnit
{

	/** Отмечен ли игроком */
	selected: boolean

	/** Был ли совершен в него выстрел */
	damage: boolean

	/** Был ли последний выстрел произведен в эту ячейку */
	isLastDamaged: boolean

	/** Переключить состояние `selected` на противоположное */
	toggle(): boolean

	onClick(): void

	readonly qn: CellQN
}

export interface IBox extends DUnit
{
	readonly qn: BoxQN

	children: {[key in SpinQNString]: ICell}

	getCell( s: string ): ICell | undefined

}

export interface IBlock extends DUnit
{
	readonly qn: BlockQN

	children: {[key: string]: IBox}

	getBox( m: string ): IBox | undefined

	/**
	 * Переключить состояния всех ячеек на противоположное.
	 * - ▯▯ ▯▯ ▯▯ --> ▮▮ ▮▮ ▮▮
	 * - ▮▯ ▮▯ ▯▯ --> ▮▮ ▮▮ ▮▮
	 * - ▮▮ ▮▮ ▮▮ --> ▯▯ ▯▯ ▯▯
	 * @returns Количество измененных ячеек. Положительное значение, если ячейки выделялись, и отрицательное, если выделения снимались.
	 * */
	toggle(): number

	onClick(): void

	selectedCellsNum: number
}


export type InteractionMode = 'none' | 'block' | 'cell';



export interface IDiagramState
{
	getBlock( qn: BlockQN ): IBlock | undefined

	getCell( qn: CellQN ): ICell | undefined

	doesSpecifyCell: boolean

	cellCounter: number

	hasSpin( cell: CellQN ): boolean

	hasCell( cell: CellQN ): boolean

	isDamaged( qn: CellQN ): boolean

	setInteractionMode( mode: InteractionMode ): void

	onCellClick( cell: ICell ): void

	onBlockClick( block: IBlock ): void

	filter: IFilter | undefined

}