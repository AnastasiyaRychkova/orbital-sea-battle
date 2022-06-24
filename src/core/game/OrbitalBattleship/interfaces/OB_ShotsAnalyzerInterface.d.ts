import type { CellQN, ChemicalElement } from '../../Chemistry/types'

interface OB_IShotsAnalyzer
{
	markShot( qn: CellQN, result: boolean ): void;

	/** Количество элементов, которые могут подойти */
	candidates: number;
	
	/** Количество ячеек, состояние которых не определено */
	undefinedCells: number;

	/** Вероятность отгадать элемент */
	certainty: number;

	/** Количество учтенных выстрелов */
	shots: number;

	/**
	 * Выбрать ячейку из тех, что неопределенны.
	 * Если таковых нет, то возвращается `undefined`.
	 * Если это первый ход, т.е. таковых 118, то ячейка выбирается случайным образом.
	 * В противном случае выбирается средняя ячейка.
	 * @returns Квантовые числа ячейки диаграммы
	 */
	pickOutCell(): CellQN | undefined;

	/**
	 * Случайный химический элемент из тех, что подходят
	 * @returns Химический элемент из периодической таблицы
	 */
	pickOutElement(): ChemicalElement | undefined;
}


export default OB_IShotsAnalyzer;