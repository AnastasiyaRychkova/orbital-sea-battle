
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
