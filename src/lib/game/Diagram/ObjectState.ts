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
} from "../ChemicalElement/QuantumNumbers";
import type { DEnvironment, SpinQNString } from "./ObjectState.d";
import IFilter from "./Filter/FilterInterface";



/*=============================================
=            State Elements            =
=============================================*/


class Cell
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

		return this._env.filter.mode === 'cell' && this._env.filter.isCellSelected( this.qn );
	}

	get highlighted(): boolean
	{
		if( !this._env.highlight )
			return false;

		return this._env.highlight.isCellSelected( this.qn );
	}
}


class Box
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
		this.qn = qn;
		this._env = env;
		this.children = {
			'+1/2': new Cell( {...qn, s: new SpinQN( 1 )}, env ),
			'−1/2': new Cell( {...qn, s: new SpinQN( -1 )}, env ),
		};

		makeObservable( this, {
			children: observable,
			_env: observable,
			filtered: computed,
			highlighted: computed,
		} );
	}

	getCell( s: string ): Cell | undefined
	{
		return this.children[ s as SpinQNString ];
	}

	
	get filtered(): boolean
	{
		if( !this._env.filter )
			return false;

		return this._env.filter.isContainerSelected( this.qn );
	}

	get highlighted(): boolean
	{
		if( !this._env.highlight )
			return false;

		return this._env.highlight.isContainerSelected( this.qn );
	}
}

class Block
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

		return this._env.filter.mode === 'block' && this._env.filter.isShipSelected( this.qn );
	}

	get highlighted(): boolean
	{
		if( !this._env.highlight )
			return false;

		return this._env.highlight.isShipSelected( this.qn );
	}
}

class Column
{
	children: {[key: string]: Block} = {};

	constructor( n: MainQN, env: DEnvironment )
	{
		const maxL = this._calcMaxL( n );
		for( let i = 0; i <= maxL; i++ )
		{
			const l = new OrbitalQN( i );
			this.children[ l.toString() ] = new Block({ n, l }, env);
		}

		makeObservable( this, {
			children: observable,
		} );
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
		})
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
		if( !this._env.filter || this._env.filter.disabled || this._env.filter.mode === 'cell' )
			return false;

		const f = this._env.filter;
		
		return this.getColumn( f.getValue( 'n' ) )
					?.getBlock( f.getValue( 'l' ) )
					?.getBox( f.getValue( 'm' ) )
					?.getCell( f.getValue( 's' ) ) !== undefined;
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