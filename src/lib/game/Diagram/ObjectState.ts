import { action, computed, makeObservable, observable } from "mobx";
import { SpinIndex } from "../ChemicalElement/DiagramCell";
import type { SpinMark, SpinState } from "../ChemicalElement/DiagramCell";
import {
	ShipQN,
	ContainerQN,
	CellQN,
	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,
	QuantumNumbers,
} from "../ChemicalElement/QuantumNumbers";
import type { DEnvironment, SpinQNString } from "./ObjectState.d";
import IFilter, { StoreKey } from "./Filter/FilterInterface";



/*=============================================
=            State Elements            =
=============================================*/

class DStateUnit
{
	/**
	 * Проверка на эквивалентность с учетом статуса активации фильтра
	 * @param qn Образец
	 * @param keys Проверяемые квантовые числа
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
	 * Фильтр может содержать деактивированные или неустановленные значения. Они не мешают поверке.
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

			if( note.isSat() )
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


class Cell extends DStateUnit
{
	/** Отмечен ли игроком */
	selected: boolean = false;

	/** Был ли совершен в него выстрел */
	damage: boolean = false;

	/** Выделен ли фильтром
	filtered: boolean = false; */

	/** Выделен ли для задания
	highlighted: boolean = false; */

	readonly qn: CellQN;

	_env: DEnvironment;


	constructor( qn: CellQN, env: DEnvironment )
	{
		super();
		makeObservable( this, {
			selected: observable,
			damage: observable,
			_env: observable,
			filtered: computed,
			highlighted: computed,
			doDamage: action,
		} );

		this.qn = qn
		this._env = env;
	}

	doDamage(): void
	{
		this.damage = true;
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


class Box extends DStateUnit
{
	children: {[key in SpinQNString]: Cell};

	/** Отмечен ли игроком
	filtered: boolean = false; */

	/** Выделен ли для задания
	highlighted: boolean = false; */

	readonly qn: ContainerQN;

	_env: DEnvironment;

	constructor( qn: ContainerQN, env: DEnvironment )
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
			'+1/2': new Cell( {...qn, s: new SpinQN( 1 )}, env ),
			'−1/2': new Cell( {...qn, s: new SpinQN( -1 )}, env ),
		};
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

class Block extends DStateUnit
{
	children: {[key: string]: Box} = {};

	/** Отмечен ли игроком
	filtered: boolean = false; */

	/** Выделен ли для задания
	highlighted: boolean = false; */

	readonly qn: ShipQN;

	_env: DEnvironment;


	constructor( qn: ShipQN, env: DEnvironment )
	{
		super();
		this.qn = qn;
		this._env = env;
		this._createChildren();

		makeObservable( this, {
			children: observable,
			_env: observable,
			filtered: computed,
			highlighted: computed,
		} );
	}

	private _createChildren()
	{
		const upperBound = this.qn.l.value;
		const lowerBound = this.qn.l.value * -1;

		for( let i = upperBound; i >= lowerBound; i-- )
		{
			const m = new MagneticQN( i );
			this.children[ m.toString() ] = new Box({ ...this.qn, m }, this._env);
		}
	}

	getBox( m: string ): Box | undefined
	{
		return this.children[ m ];
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

		const maxL = this._calcMaxL( n );
		for( let i = 0; i <= maxL; i++ )
		{
			const l = new OrbitalQN( i );
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

class DiagramState
{
	children: {[key: string]: Column} = {};
	_env: DEnvironment;

	constructor( filter?: IFilter, highlight?: IFilter )
	{
		this._env = {
			filter,
			highlight,
		};
		
		for (let i = 0; i <= 7; i++) {
			this.children[ i.toString() ] = new Column(
				new MainQN( i ),
				this._env
			);
		}

		makeObservable( this, {
			children: observable,
			_env: observable,
			doesSpecifyCell: computed,
		});
	}

	getColumn( n: string ): Column | undefined
	{
		return this.children[ n ];
	}

	getBlock( n: string, l: string ): Block | undefined
	{
		return this.getColumn( n )?.getBlock( l );
	}

	getCell( qn: CellQN ): Cell | undefined
	{
		return this.getColumn( qn.n.toString() )
					?.getBlock( qn.l.toString() )
					?.getBox( qn.m.toString() )
					?.getCell( qn.s.toString() );
	}

	get doesSpecifyCell(): boolean
	{
		if( !this._env.filter || this._env.filter.disabled || this._env.filter.mode !== 'cell' )
			return false;

		const f = this._env.filter;
		return this.getColumn( f.getValueAsString( 'n' ) )
				?.getBlock( f.getValueAsString( 'l' ) )
				?.getBox( f.getValueAsString( 'm' ) )
				?.getCell( f.getValueAsString( 's' ) ) !== undefined;
	}

	hasSpin( spin: SpinIndex ): boolean
	{
		return false;
	}

	/**
	 * Отметить спин в объекте конфигурации элемента
	 * 
	 * @param spin Индекс спина
	 * @param state Отмечен ли спин
	 */
	write( spin: SpinIndex, state: SpinMark | SpinState ): DiagramState
	{
		return this;
	}
}



export default DiagramState;