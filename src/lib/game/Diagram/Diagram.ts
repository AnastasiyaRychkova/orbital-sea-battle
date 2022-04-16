import { makeObservable, observable, action, computed } from "mobx";

import { stringSchemeToQuantumNumbers } from "../ChemicalElement/QuantumNumbers";
import State from "./DObjectState";

import { CellQN, BlockQN, QNStringScheme, ElemConfig } from '../Services/Chemistry';
import IDiagram, { DiagramEvent, DiagramEventData } from "./DiagramInterface";
import EventProvider from "../../util/EventEmitter/EventProvider";
import { StateType } from "./DObjectState.d";
import IFilter from "./Filter/FilterInterface";



/**
 * **Диаграмма, содержащая электронное строение химического элемента**
 * 
 * * Содержит *строение химического элемента* из периодической таблицы
 * * Выступает в качестве *игрового поля*
 * * Изменяет состояние напрямую, меняя состояние определенных клеток или задавая состояние всей диаграммы целиком
 * * Изменяет диаграмму, переключая состояние ячеек или блоков на противоположное
 * * Параметр `disabled` блокирует выполнение игровых команд (🎲)
 * * Оповещает о совершении событий
 */
class Diagram extends EventProvider<DiagramEvent, DiagramEventData> implements IDiagram
{
	_state!: State;
	_disabled: boolean; // TODO: rename diagram.disabled => .editable
	_filter?: IFilter;
	_highlight?: IFilter;


	// private static readonly SIZE: number = 118;


	constructor( filter?: IFilter, highlight?: IFilter ) {
		super();
		makeObservable(this, {

			_state: observable,
			_disabled: observable,
			_filter: observable,
			_highlight: observable,

			disabled: computed,
			observableState: computed,
			setElementByNumber: action,
			toggleCell: action,
			toggleBlock: action,
			fire: action,
			reset: action,
		});

		this._filter = filter;
		this._highlight = highlight;

		this.reset(); // Initialization of _state
		this._disabled = false;
	}

	get observableState(): StateType
	{
		return this._state;
	}

	setElementByNumber( number: number ): void
	{
		throw new Error("Method not implemented.");
	}

	get disabled(): boolean
	{
		return this._disabled;
	}

	set disabled( disable: boolean )
	{
		this._disabled = disable;
		this._emit( disable ? 'disabled' : 'enabled' );
	}

	toggleCell( qn: CellQN ): boolean
	{
		if( this._disabled )
			return false;
		return this._state.toggleCell( qn );
	}

	toggleBlock( qn: BlockQN ): boolean
	{
		if( this._disabled )
			return false;
		return this._state.toggleBlock( qn );
	}

	setSpin( qn: CellQN, state: boolean ): void
	{
		this._state.write( qn, state );
	}

	isEqual( config: ElemConfig ): boolean
	{
		return this._state.asConfig().isEqual( config );
	}

	fire( qn: CellQN ): boolean
	{
		if( this._disabled || this._state.isDamaged( qn ) )
			return false;

		const fireResult = this._state.doDamage( qn );
		if( fireResult )
			this._emit( 'shot', {
				qn,
			});
		return fireResult;
	}

	hasSpin( qn: CellQN ): boolean
	{
		return this._state.hasSpin( qn );
	}

	setState( config: ElemConfig ): void {
		this._state.setState( config );
	}

	reset(): void
	{
		this._filter?.reset();
		this._highlight?.reset();
		this._state = new State( this._filter, this._highlight );
	}

	highlight( qnScheme: QNStringScheme ): void
	{
		if( !this._highlight )
			return;
		this._highlight.setState( stringSchemeToQuantumNumbers( qnScheme ) );
	}
}



export default Diagram;

export type {
	IDiagram,
	DiagramEvent,
	DiagramEventData
};