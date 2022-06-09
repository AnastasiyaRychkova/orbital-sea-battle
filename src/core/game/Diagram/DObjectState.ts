import { action, computed, makeObservable, observable } from "mobx";
import Chemistry, { QN, ElemConfig, CellIndex } from '../Services/Chemistry';

import type {
	BlockQN,
	BoxQN,
	CellQN,
	QuantumNumbers,
	MainQN,
} from '../Services/Chemistry';
import type { IBlock, ICell, DEnvironment, IDiagramState, InteractionMode, SpinQNString, IBox } from "./DObjectState.d";
import IFilter, { StoreKey } from "./Filter/FilterInterface";
import { toIndexScheme } from "../ChemicalElement/QNtoIndexConverter";


const index = Chemistry.cellIndex;



/*=============================================
=            State Elements            =
=============================================*/

/**
 * Базовый класс элемента диаграммы:
 * колонка / блок / контейнер / ячейка
 */
class DStateUnit
{
	/**
	 * Проверка на эквивалентность с учетом статуса активации фильтра
	 * @param qn Образец
	 * @param key Проверяемые квантовые числа
	 * @returns Есть ли точное совпадение
	 */
	protected _isEqualQN( qn: QuantumNumbers, key: StoreKey, filter: IFilter ): boolean
	{
		const note = filter._get( key );
		return !note.isDisabled() && note.isEqual( qn[ key ] );
	}

	/**
	 * Проверить, проходит ли проверку образец по фильтру.
	 * 
	 * Фильтр может содержать деактивированные или неустановленные значения. Они не мешают поверке. Образец не проходит проверку, если квантовые числа в фильтре установлены и активны и не совпадают со значениями образца.
	 * @param qn Образец
	 * @param keys Проверяемые квантовые числа
	 * @returns Соответствует ли образец фильтру
	 */
	protected _checkFilters(
			qn: QuantumNumbers,
			keys: StoreKey[],
			filter: IFilter,
			strict: boolean = false ): boolean
	{
		let equalFilters = 0;

		for( const key of keys ) {
			const note = filter._get( key )!;

			if( note.isSet() )
			{
				if( note.isEqual( qn[ key ] ) )
					equalFilters++;
				else
					return false;
			}
		}
		return strict ? equalFilters > 0 : true;
	}
}


class Cell extends DStateUnit implements ICell
{
	/** Отмечен ли игроком */
	selected: boolean = false;

	/** Был ли совершен в него выстрел */
	damage: boolean = false;

	isLastDamaged: boolean = false;

	readonly qn: CellQN;

	_env: DEnvironment;


	constructor( qn: CellQN, env: DEnvironment )
	{
		super();
		makeObservable( this, {
			selected: observable,
			damage: observable,
			isLastDamaged: observable,
			_env: observable,
			filtered: computed,
			highlighted: computed,
			doDamage: action,
			onClick: action,
		} );

		this.qn = qn
		this._env = env;
		this.onClick = this.onClick.bind( this );
	}

	toggle(): boolean
	{
		this.selected = !this.selected;
		return this.selected;
	}

	doDamage(): boolean
	{
		this.damage = true;
		return this.selected;
	}

	onClick(): void
	{
		this._env.root.onCellClick( this );
	}

	get filtered(): boolean
	{
		if( !this._env.filter )
			return false;

		return this._isEqualQN( this.qn, 's', this._env.filter )
			&& this._checkFilters( this.qn, ['n', 'l', 'm'], this._env.filter );
	}

	get highlighted(): boolean
	{
		if( !this._env.highlight )
			return false;

			return this._isEqualQN( this.qn, 's', this._env.highlight )
			&& this._checkFilters( this.qn, ['n', 'l', 'm'], this._env.highlight );
	}
}


class Box extends DStateUnit implements IBox
{
	children: {[key in SpinQNString]: Cell};

	readonly qn: BoxQN;

	_env: DEnvironment;

	constructor( qn: BoxQN, env: DEnvironment )
	{
		super();
		makeObservable( this, {
			children: observable,
			_env: observable,
			filtered: computed,
			highlighted: computed,
		} );

		this.qn = qn;
		this._env = env;
		this.children = {
			'+1/2': new Cell( {...qn, s: QN.s( 1 )}, env ),
			'−1/2': new Cell( {...qn, s: QN.s( -1 )}, env ),
		};
	}

	get selectedCellsNum(): number
	{
		let counter: number = 0;
		if( this.children["+1/2"].selected )
			counter++;
		if( this.children["−1/2"].selected )
			counter++;
		return counter;
	}

	fill(): void
	{
		this.children["+1/2"].selected = true;
		this.children["−1/2"].selected = true;
	}

	clear(): void
	{
		this.children["+1/2"].selected = false;
		this.children["−1/2"].selected = false;
	}

	getCell( s: string ): Cell | undefined
	{
		return this.children[ s as SpinQNString ];
	}

	
	get filtered(): boolean
	{
		if( !this._env.filter )
			return false;

		return this._env.filter.mode === 'box'
			&& this._isEqualQN( this.qn, 'm', this._env.filter )
			&& this._checkFilters( this.qn, ['n', 'l'], this._env.filter );
	}

	get highlighted(): boolean
	{
		if( !this._env.highlight )
			return false;

		return this._env.highlight.mode === 'box'
			&& this._isEqualQN( this.qn, 'm', this._env.highlight )
			&& this._checkFilters( this.qn, ['n', 'l'], this._env.highlight )
			;
	}
}

class Block extends DStateUnit implements IBlock
{
	children: {[key: string]: Box} = {};

	readonly qn: BlockQN;

	_env: DEnvironment;

	#length: number;


	constructor( qn: BlockQN, env: DEnvironment )
	{
		super();
		makeObservable( this, {
			children: observable,
			_env: observable,
			filtered: computed,
			highlighted: computed,
			onClick: action,
		} );

		this.qn = qn;
		this._env = env;
		this.#length = this._createBoxes();
		this.onClick = this.onClick.bind( this );
	}

	/**
	 * Создать контейнеры
	 * @returns Количество созданных контейнеров
	 */
	private _createBoxes(): number
	{
		const mMax = this.qn.l.value;
		const mMin = this.qn.l.value * -1;

		for( let i = mMax; i >= mMin; i-- )
		{
			const m = QN.m( i );
			this.children[ m.toString() ] = new Box({ ...this.qn, m }, this._env);
		}

		return mMax * 2 + 1;
	}

	toggle(): number
	{
		const selectedCells = this.selectedCellsNum;
		if( selectedCells === this.#length * 2 )
		{
			this.clear();
			return -1 * selectedCells;
		}
		else
		{
			this.fill();
			return (this.#length * 2) - selectedCells;
		}
	}

	get selectedCellsNum(): number
	{
		let counter: number = 0;
		for( const box of Object.values( this.children ) )
			counter += box.selectedCellsNum;
		return counter;
	}

	fill(): void
	{
		for( const box of Object.values( this.children ) )
			box.fill();
	}

	clear(): void
	{
		for( const box of Object.values( this.children ) )
			box.clear();
	}

	getBox( m: string ): Box | undefined
	{
		return this.children[ m ];
	}

	onClick(): void
	{
		this._env.root.onBlockClick( this );
	}

	get filtered(): boolean
	{
		if( !this._env.filter )
			return false;

		return this._env.filter.mode === 'block'
			&& this._checkFilters( this.qn, ['n', 'l'], this._env.filter, true );
	}

	get highlighted(): boolean
	{
		if( !this._env.highlight )
			return false;

		return this._env.highlight.mode === 'block'
			&& this._checkFilters( this.qn, ['n', 'l'], this._env.highlight, true );
	}
}

class Column
{
	children: {[key: string]: Block} = {};

	constructor( n: MainQN, env: DEnvironment )
	{
		makeObservable( this, {
			children: observable,
		} );

		this._createBlocks(n, env);
	}

	private _createBlocks( n: MainQN, env: DEnvironment ): void
	{
		const lMin = QN.qClass.l.MIN;
		const lMax = this._calcMaxL( n );
		for( let i = lMin; i <= lMax; i++ ) {
			const l = QN.l(i);
			this.children[ l.toString() ] = new Block({ n, l }, env);
		}
	}

	private _calcMaxL( n: MainQN ): number
	{
		return -1 * Math.abs( n.value - 4.5 ) + 3.5;
	}

	getBlock( l: string ): Block | undefined
	{
		return this.children[ l ];
	}
}



/*=============================================
=            State Class            =
=============================================*/

class DiagramState implements IDiagramState
{
	children: {[key: string]: Column} = {};
	lastShot?: Cell;
	mode: InteractionMode;
	cellCounter: number;
	_env: DEnvironment;

	constructor( filter?: IFilter, highlight?: IFilter )
	{
		this._env = {
			filter,
			highlight,
			root: this,
		};
		
		this._createColumns();

		makeObservable( this, {
			children: observable,
			mode: observable,
			cellCounter: observable,
			_env: observable,
			doesSpecifyCell: computed,
			filter: computed,
			doDamage: action,
		});

		this.mode = 'none';
		this.cellCounter = 0;
	}

	private _createColumns(): void
	{
		const nMin = QN.qClass.n.MIN;
		const nMax = QN.qClass.n.MAX;
		for (let i = nMin; i <= nMax; i++) {
			this.children[ i.toString() ] = new Column(
				QN.n(i),
				this._env
			);
		}
	}

	get filter(): IFilter | undefined
	{
		return this._env.filter;
	}

	setInteractionMode( mode: InteractionMode ): void
	{
		this.mode = mode;
	}

	getColumn( n: string ): Column | undefined
	{
		return this.children[ n ];
	}

	getBlock( qn: BlockQN ): Block | undefined
	{
		return this.getColumn( qn.n.toString() )?.getBlock( qn.l.toString() );
	}

	getCell( qn: CellQN ): Cell | undefined
	{
		return this.getColumn( qn.n.toString() )
					?.getBlock( qn.l.toString() )
					?.getBox( qn.m.toString() )
					?.getCell( qn.s.toString() );
	}

	toggleBlock( qn: BlockQN ): boolean
	{
		const selectedCells = this.getBlock( qn )?.toggle() || 0;
		return selectedCells > 0;
	}

	toggleCell( qn: CellQN ): boolean
	{
		return this.getCell( qn )?.toggle() === true;
	}

	onCellClick( cell: ICell ): void
	{
		if( this.mode === 'cell' )
		{
			const cellState = cell.toggle();
			if( cellState )
				this.cellCounter++;
			else
				this.cellCounter--;
		}
	}

	onBlockClick( block: IBlock ): void
	{
		if( this.mode === 'block' )
			this.cellCounter += block.toggle();
	}

	get doesSpecifyCell(): boolean
	{
		if( !this._env.filter || this._env.filter.disabled || this._env.filter.mode !== 'cell' )
			return false;

		const filter = this._env.filter;
		return this.getColumn( filter.getValueAsString( 'n' ) )
				?.getBlock( filter.getValueAsString( 'l' ) )
				?.getBox( filter.getValueAsString( 'm' ) )
				?.getCell( filter.getValueAsString( 's' ) ) !== undefined;
	}

	hasSpin( cell: CellQN ): boolean
	{
		return this.getCell( cell )?.selected === true;
	}

	hasCell( cell: CellQN ): boolean
	{
		return this.getCell( cell ) !== undefined;
	}

	/**
	 * Установить значение выделения ячейки в диаграмме
	 * 
	 * @param qn Квантовые числа ячейки
	 * @param state Отмечена ли ячейка
	 */
	write( qn: CellQN, state: boolean ): DiagramState
	{
		const cell = this.getCell( qn );
		if( cell )
			cell.selected = state;
		return this;
	}

	/**
	 * "Выстрелить" по ячейке
	 * @param qn Координаты ячейки
	 * @returns Произошел ли выстрел
	 */
	doDamage( qn: CellQN ): boolean
	{
		const cell = this.getCell( qn );
		if( !cell )
			return false;
		
		const result = cell.doDamage();
		this._markLastShot( cell );
		return result;
	}

	private _markLastShot( cell: Cell ): void
	{
		if( this.lastShot === cell )
			return;

		if( this.lastShot )
			this.lastShot.isLastDamaged = false;

		this.lastShot = cell;
		cell.isLastDamaged = true;
	}

	isDamaged( qn: CellQN ): boolean
	{
		return this.getCell( qn )?.damage === true;
	}

	setState( config: ElemConfig ): void
	{
		this._traverse( ( box: Box, scheme: CellIndex[] ) => {
			box.children["+1/2"].selected = config.hasSpin( scheme[0] );
			box.children["−1/2"].selected = config.hasSpin( scheme[1] );
		} );
	}

	asConfig(): ElemConfig
	{
		const config = Chemistry.config();

		this._traverse( ( box: Box, scheme: CellIndex[] ) => {
			config.write( scheme[0], box.children["+1/2"].selected );
			config.write( scheme[1], box.children["−1/2"].selected );
		} );

		return config;
	}

	private _traverse( boxCallback: ( box: Box, scheme: CellIndex[] ) => void ): void
	{
		for( const [n, column] of Object.entries( this.children ) ) {
			const columnScheme = (DiagramState.configScheme as any)[n];

			for( const [l, block] of Object.entries( column.children ) ) {
				const blockScheme = (columnScheme as any)[l];

				for( const [m, box] of Object.entries( block.children ) ) {
					const boxScheme = (blockScheme as any)[m];

					boxCallback( box, boxScheme );
				}
			}
		}
	}


	static readonly configScheme = toIndexScheme;
}



export default DiagramState;