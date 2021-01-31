import {
	SpinState,
	EDiagramCellState as CellState,
} from '../ChemicalElement/DiagramCell';
import ElemConfig from '../ChemicalElement/ElemConfig';

/** Полное состояние диаграммы */
export default class DiagramState
{
	#element: ElemConfig = new ElemConfig();
	#shots: ElemConfig = new ElemConfig();
	#lastShotIndex: number = -1;

	private static readonly SIZE: number = 118;

	/**
	 * Задать полное состояние диаграммы
	 * 
	 * @param element Конфигурация элементов
	 * @param shots Конфигурация выстрелов
	 * @param lastShot Номер последнего выстрела (если был)
	 */
	setState( element: ElemConfig, shots: ElemConfig, lastShot: number = -1 ): void
	{
		this.#element = element;
		this.#shots = shots;
		this.#lastShotIndex = lastShot;
	}

	/**
	 * Преобразовать состояние диаграммы из массива ячеек
	 * 
	 * @param state Массив CellState
	 * @param lastShot Номер последнего выстрела (если был)
	 */
	fromCellArray( state: CellState[], lastShot: number = -1 ): void
	{
		this.#lastShotIndex = lastShot;
		
		const element: SpinState[] = [];
		const shots: SpinState[] = [];

		for ( let i = 0; i <  DiagramState.SIZE; i++ )
		{
			element[ i ] = (state[ i ] % 2) ? 1 : 0;
			shots[ i ] = (state[ i ] > 1) ? 1 : 0;
		}
		
		this.#element = ElemConfig.createFromSpinArray( element );
		this.#shots = ElemConfig.createFromSpinArray( shots );
	}

	/** Полное состояние диаграммы в виде массива состояний ячеек */
	toCellArray(): CellState[]
	{
		return ElemConfig.getDiagramFullState( this.#element, this.#shots );
	}
	
	/** Возвращает номер ячейки, по которой сделали последний выстрел,
	 *  -1 если выстрелов не было. 
	 * */
	get lastShot(): number
	{
		return this.#lastShotIndex;
	}

	set lastShot( index: number )
	{
		this.#lastShotIndex = index;
	}

	/** Возвращает конфигурацию элемента диаграммы */
	getElementConfig(): ElemConfig
	{
		return this.#element;
	}

	/** Возвращает конфигурацию сделанных выстрелов */
	getShots(): ElemConfig
	{
		return this.#shots;
	}
}