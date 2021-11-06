import {
	SpinIndex,
	SpinState,
} from '../ChemicalElement/DiagramCell';
import ElemConfig from '../ChemicalElement/ElemConfig';
import Diagram from './DiagramStatic';
// import { Ship } from './Ship';

/** Переключаемая диаграмма */
export class ToggleDiagram extends Diagram
{
	/** Конфигурация диаграммы в виде массива спинов */
	#configuration: SpinState[] = [];

	#disabled: boolean = false;

	private static readonly SIZE: number = 118;

	constructor()
	{
		super();
		for ( let i = 0; i < ToggleDiagram.SIZE; i++ )
			this.#configuration[ i ] = 0;
	}

	/**
	 * Переключить состояние одной ячейки диаграммы
	 * 
	 * @param cell Ячейка
	 */
/* 	toggleCell( cell: SpinIndex ): void
	{
		if ( !this.#disabled )
			this.#configuration[ cell.value ] = ( this.#configuration[ cell.value ] == 0 ) ? 1 : 0;
	} */
	
	/**
	 * Переключить состояние всего корабля.
	 * Если в корабле разные состояния ячеек, то он выделяется целиком
	 * 
	 * @param ship Корабль
	 */
	// toggleShip( ship: Ship ): void
	// {
	// 	if ( !this.#disabled )
	// 	{
	// 		const newState = this._newShipState( ship );
	// 		for( let i = ship.firstCell.value; i <= ship.lastCell.value; i++  )
	// 			this.#configuration[ i ] = newState;
	// 	}
	// }

	// private _newShipState( ship: Ship ): SpinState
	// {
	// 	for( let i = ship.firstCell.value; i <= ship.lastCell.value; i++  )
	// 		if ( this.#configuration[ i ] == 0 )
	// 			return 1;
	// 	return 0;
	// }

	get disabled(): boolean
	{
		return this.#disabled;
	}

	set disabled( isDisabled: boolean )
	{
		this.#disabled = isDisabled;
	}
	
	/**
	 * Устанавливает состояние диаграммы
	 * 
	 * @param state Конфигурация химического элемента
	 */
/* 	setState( state: ElemConfig ): void
	{
		this.#configuration = state.toArray();
	} */

	/**
	 * Возвращает текущую конфигурацию химического элемента диаграммы
	 */
	getState(): ElemConfig
	{
		return ElemConfig.createFromSpinArray( this.#configuration );
	}
	
}
