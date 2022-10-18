import { makeObservable, observable, action, computed } from "mobx";

import { QN } from "../Chemistry";
import State from "./DObjectState";
import { EventProvider } from "../../util";

import type { ElemConfig } from '../Chemistry';
import type { CellQN, BlockQN, QNStringScheme } from '../Chemistry/types';
import type {
	IDiagram,
	DiagramEvent,
	DiagramEventData,
	IFilter,
	IDiagramState,
	InteractionMode,
} from "./types";



/**
 * **Диаграмма, содержащая электронное строение химического элемента**
 * 
 * * Содержит *строение химического элемента* из периодической таблицы
 * * Выступает в качестве *игрового поля*
 * * Изменяет состояние напрямую, меняя состояние определенных клеток или задавая состояние всей диаграммы целиком
 * * Изменяет диаграмму, переключая состояние ячеек или блоков на противоположное
 * * Параметр `mode` задает режим редактирования
 * * Оповещает о совершении событий
 */
class Diagram extends EventProvider<DiagramEvent, DiagramEventData> implements IDiagram
{
	_state!: State;
	// _disabled: boolean; // TODO: rename diagram.disabled => .editable
	_filter?: IFilter;
	_highlight?: IFilter;


	// private static readonly SIZE: number = 118;


	constructor( filter?: IFilter, highlight?: IFilter ) {
		super();
		makeObservable(this, {

			_state: observable,
			// _disabled: observable,
			_filter: observable,
			_highlight: observable,

			observableState: computed,
			mode: computed,
			setElementByNumber: action,
			toggleCell: action,
			toggleBlock: action,
			fire: action,
			reset: action,
		});

		this._filter = filter;
		this._highlight = highlight;

		this.reset(); // Initialization of _state
		// this._disabled = false;
	}

	get observableState(): IDiagramState
	{
		return this._state;
	}

	setElementByNumber( number: number ): void
	{
		throw new Error("Method not implemented.");
	}

	get mode(): InteractionMode
	{
		return this._state.mode;
	}

	set mode( mode: InteractionMode )
	{
		this._state.mode = mode;
	}

	toggleCell( qn: CellQN ): boolean
	{
		if( this.mode !== 'none' )
			return false;
		return this._state.toggleCell( qn );
	}

	toggleBlock( qn: BlockQN ): boolean
	{
		if( this.mode !== 'none' )
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
		if( this._state.isDamaged( qn )
		)
			return false;
		console.log( 'Fire:', qn );
		const shotResult = this._state.doDamage( qn );
		this._emit( 'shot', {
			qn,
			result: shotResult,
		});
		return shotResult;
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
		this._highlight.setState( QN.strSchemeToQN( qnScheme ) );
	}
}



export default Diagram;

export type {
	IDiagram,
	DiagramEvent,
	DiagramEventData,
	IDiagramState,
};