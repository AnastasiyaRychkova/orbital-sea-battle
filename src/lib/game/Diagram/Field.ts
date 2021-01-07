import { EDiagramCellState as CellState } from '../ChemicalElement/DiagramCell';
import { ShotCell, ShotResult } from './Shot';
import DiagramState from './DiagramState';
import Diagram from './Diagram';

/** Обновляемое игровое поле */
export default class Field extends Diagram
{
	/** Конфигурация диаграммы в виде массива ячеек */
	#configuration: CellState[] = [];
	#lastShotIndex: number = -1;

	private static readonly SIZE: number = 118;

	constructor() 
	{
		super();
		for ( let i = 0; i <  Field.SIZE; i++ )
			this.#configuration[ i ] = CellState.off;
	}
	
	/**
	 * Устанавливает конфигурацию игрового поля
	 * @param state Состояние диаграммы
	 */
	setState( state: DiagramState ): void
	{
		this.#lastShotIndex = state.lastShot;
		this.#configuration = state.toCellArray();
	}
	
	/**
	 * Возвращает текущую конфигурацию диаграммы 
	 */
	getState(): DiagramState
	{
		const result: DiagramState = new DiagramState();
		result.fromCellArray( this.#configuration, this.#lastShotIndex );
		return result;
	}

	/**
	 * Отображает выстрел по ячейке
	 * 
	 * Возвращает результат выстрела (промах / попадание)
	 * 
	 * @param shot Ячейка
	 */
	displayShotResult( shot: ShotCell ): ShotResult
	{
		switch( this.#configuration[ shot.value ]) {
			case CellState.off: 
				this.#lastShotIndex = shot.value;
				this.#configuration[ shot.value ] = CellState.miss;
				return false;
			case CellState.on:
				this.#lastShotIndex = shot.value;
				this.#configuration[ shot.value ] = CellState.hit;
				return true;
			case CellState.miss: 
				return false;
			case CellState.hit:
				return true;
		}
	}

}
