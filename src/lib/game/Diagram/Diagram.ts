import { makeObservable, observable, action, computed } from "mobx";

import { stringSchemeToQuantumNumbers } from "../ChemicalElement/QuantumNumbers";
import { SpinIndex } from "../ChemicalElement/DiagramCell";
import State from "./ObjectState";

import type { CellQN, ShipQN, QNStringScheme } from "../ChemicalElement/QuantumNumbers";
import IDiagram, { DiagramEvent, DiagramEventData } from "./DiagramInterface";
import EventProvider from "../../util/EventEmitter/EventProvider";
import { StateType } from "./ObjectState.d";
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
class Diagram extends EventProvider<DiagramEvent, DiagramEventData> implements IDiagram {
	_state!: State;
	_shots!: State;
	_lastShotIndex?: SpinIndex;
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
			setCellState: action,
			toggleCell: action,
			toggleShip: action,
			aim: action,
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

	setCellState( quantumNumbers: CellQN, state: boolean ): void
	{
		throw new Error("Method not implemented.");
	}

	isLastShot( quantumNumbers: CellQN ): boolean
	{
		throw new Error("Method not implemented.");
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

	toggleCell( quantumNumbers: CellQN ): void
	{
		throw new Error("Method not implemented.");
	}

	toggleShip( quantumNumbers: ShipQN ): void
	{
		throw new Error("Method not implemented.");
	}

	aim( qn: CellQN ): void
	{
		if( this._disabled )
			return;

		const cell = this._state.getCell( qn );
		if( !cell )
			return;

		this._emit( 'shot', {
			qn,
			isReShot: cell.damage,
		});
		cell.doDamage();
	}

	setState(): void {
		throw new Error("Method not implemented.");
	}

	reset(): void
	{
		this._filter?.reset();
		this._highlight?.reset();
		this._state = new State( this._filter, this._highlight );
		this._lastShotIndex = undefined;
	}

	highlight( qnScheme: QNStringScheme ): void
	{
		if( !this._highlight )
			return;
		console.log(qnScheme);
		this._highlight.setState( stringSchemeToQuantumNumbers( qnScheme ) );
	}
}



export default Diagram;