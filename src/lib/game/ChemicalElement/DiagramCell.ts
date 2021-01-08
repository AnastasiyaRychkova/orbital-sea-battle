import IntInRange from '../../util/IntInRange';

/**
 * **Ячейка диаграммы (=spin)**
 * 
 * Хранит индекс ячейки: [0;117]
 */
export class DiagramCell extends IntInRange
{
	static readonly MIN: number = 0;
	static readonly MAX: number = 117;

	constructor( number: number = DiagramCell.MIN )
	{
		super( number );
	}

	protected static range( number: number = 0 ): number
	{
		return super.range( number, DiagramCell );
	}

	static *iterator()
	{
		const cell = new DiagramCell( DiagramCell.MIN );

		for(; cell._number <= DiagramCell.MAX; cell._number++)
			yield cell;
	}
}

/** Состояние стрелки диаграммы */
export enum EDiagramCellState {
	off,	// неактивен
	on,		// отмечен
	miss,	// промах
	hit,	// попадание
}

export type SpinMark = false | true;
export type SpinState = 0 | 1;

export function calcCellState( spin: SpinState, shot: SpinState ): EDiagramCellState
{
	return spin + 2 * shot;
}
