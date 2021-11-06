import { makeObservable, observable, action, computed } from "mobx";

import IEventEmitter from "../../util/EventEmitter/EventEmitterInterface";
import EventEmitterAdapter from "../../util/EventEmitter/EventEmitter";
import { EDiagramCellState, SpinIndex } from "../ChemicalElement/DiagramCell";
import ElemConfig from "../ChemicalElement/ElemConfig";
import PeriodicTableInterface from "../ChemicalElement/PeriodicTableInterface";

import type { CellQN, ShipQN } from "../ChemicalElement/QuantumNumbers";
import IDiagram, { DiagramEvent, DiagramEventData } from "./DiagramInterface";
import EventEmitterInterface from "../../util/EventEmitter/EventEmitterInterface";



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
class Diagram implements IDiagram {
	readonly periodicTable: PeriodicTableInterface;
	_state!: ElemConfig;
	_shots!: ElemConfig;
	_lastShotIndex?: SpinIndex;
	_disabled: boolean; // TODO: rename diagram.disabled => .editable

	private emitter: IEventEmitter = new EventEmitterAdapter();


	// private static readonly SIZE: number = 118;


	constructor(periodicTable: PeriodicTableInterface) {
		makeObservable(this, {

			_state: observable,
			_shots: observable,
			_disabled: observable,

			disabled: computed,
			setElementByNumber: action,
			setCellState: action,
			toggleCell: action,
			toggleShip: action,
			aim: action,
			reset: action,
		});

		this.periodicTable = periodicTable;
		this.reset();
		this._disabled = false;
	}

	getCellState( quantumNumbers: CellQN ): EDiagramCellState
	{
		const index = this._getCellIndex( quantumNumbers );
		return index
				? ElemConfig.getCellState( index,
										this._state,
										this._shots )
				: EDiagramCellState.off;
	}

	private _getCellIndex( quantumNumbers: CellQN ): SpinIndex | undefined
	{
		return this.periodicTable.converter.getCellIndex( quantumNumbers );
	}


	setCellState( quantumNumbers: CellQN, state: boolean ): void
	{
		const index = this._getCellIndex( quantumNumbers );
		if( !index )
			return;

		if( this._state.hasSpin( index ) !== state )
		{
			this._state.write( index, state );
			this._emit( 'changed', {
				type: 'cell',
				index: index.value,
				qn: quantumNumbers,
			});
		}
		
	}

	isLastShot( quantumNumbers: CellQN ): boolean
	{
		const index = this._getCellIndex( quantumNumbers );
		return this._lastShotIndex !== undefined
				&& index !== undefined
				&& this._lastShotIndex.value === index.value;
	}

	setElementByNumber( number: number ): void
	{
		const element = this.periodicTable.getByNumber( number );
		this._state = element.config.clone();
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
		if( this._disabled )
			return;

		const index = this._getCellIndex( quantumNumbers );
		if( !index )
			return;

		this._state.write( index, !this._state.hasSpin( index ) );
		this._emit( 'changed', {
			type: 'cell',
			index: index.value,
			qn: quantumNumbers,
		} )
	}

	toggleShip( quantumNumbers: ShipQN ): void
	{
		if( this._disabled )
			return;

		const ship = this.periodicTable.converter.getBlockIndexes( quantumNumbers );
		if( !ship )
			return;

		if( this._isShipFilled( ship ) )
			this._clearShip( ship );
		else
			this._fillShip( ship );

		this._emit( 'changed', {
			type: 'ship',
			qn: quantumNumbers,
		} )
	}

	private _isShipFilled( ship: SpinIndex[] ): boolean
	{
		for (let i = 0; i < ship.length; i++) {
			if( !this._state.hasSpin( ship[i] ) )
				return false;
		}
		return true;
	}
	
	private _clearShip( ship: SpinIndex[] ): void
	{
		for( const index of ship ) {
			this._state.writeWithoutUpdate( index, false );
		}
		this._state.update();
	}
	
	private _fillShip( ship: SpinIndex[] ): void
	{
		for( const index of ship ) {
			this._state.writeWithoutUpdate( index, true );
		}
		this._state.update();
	}

	aim( quantumNumbers: CellQN ): void
	{
		if( this._disabled )
			return;

		const index = this._getCellIndex( quantumNumbers );
		if( !index )
			return;

		if( this._shots.hasSpin( index ) )
		{
			this._emit( 'shot', {
				index: index.value,
				qn: quantumNumbers,
				isReShot: true,
			});
		}
		else {
			this._shots.write( index, true );
			this._emit( 'shot', {
				index: index.value,
				qn: quantumNumbers,
				isReShot: false,
			});
		}
	}

	setState(): void {
		throw new Error("Method not implemented.");
	}

	reset(): void
	{
		this._state = new ElemConfig();
		this._shots = new ElemConfig();
		this._lastShotIndex = undefined;
	}

	on( event: DiagramEvent, func: Function ): EventEmitterInterface
	{
		return this.emitter.on( event, func );
	}

	once( event: DiagramEvent, func: Function ): EventEmitterInterface
	{
		return this.emitter.once( event, func );
	}

	remove( event: DiagramEvent, func: Function ): EventEmitterInterface
	{
		return this.emitter.remove( event, func );
	}

	private _emit( event: DiagramEvent, data?: DiagramEventData ): EventEmitterInterface
	{
		return this.emitter.emit( event, data );
	}

}



export default Diagram;