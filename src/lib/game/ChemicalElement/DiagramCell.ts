import IntInRange from '../../util/IntInRange';

/**
 * **Ячейка диаграммы (=spin)**
 * 
 * Хранит индекс ячейки: [0;117]
 */
export class SpinIndex extends IntInRange
{
	static readonly MIN: number = 0;
	static readonly MAX: number = 117;

	constructor( number: number = SpinIndex.MIN )
	{
		super( number );
	}

	protected static range( number: number = 0 ): number
	{
		return super.normalize( number, SpinIndex );
	}

	static *iterator()
	{
		const cell = new SpinIndex( SpinIndex.MIN );

		for(; cell._number <= SpinIndex.MAX; cell._number++)
			yield cell;
	}
}


//TODO: вынести все, что касается диаграммы в отдельный файл во внешнюю папку
/** Состояние стрелки диаграммы */
export enum EDiagramCellState {
	off,	// неактивен
	on,		// отмечен
	miss,	// промах
	hit,	// попадание
}

export type SpinMark = false | true;
export type SpinState = 0 | 1;

export function calcCellState( spin: SpinState|boolean, shot: SpinState|boolean ): EDiagramCellState
{
	return 2 * Number( shot ) + Number( spin );
}
