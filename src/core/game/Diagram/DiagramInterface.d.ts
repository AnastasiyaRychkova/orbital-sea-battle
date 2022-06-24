import { EDiagramCellState } from "../Chemistry/DiagramCell";
import type { ElemConfig } from '../Services/Chemistry';
import type { IEventProvider } from "../../util/types";
import type { CellQN, BlockQN, QNStringScheme
} from "../Chemistry/QN/types";
import type { IDiagramState } from "./DObjectState.d";


/** События, которые генерирует диаграмма */
export type DiagramEvent = | 'changed'
							| 'shot'
							| 'disabled'
							| 'enabled';

export type DiagramEventData = {
	type?: 'cell' | 'ship',
	index?: number,
	isReShot?: boolean,
	qn: CellQN | BlockQN,
	result?: boolean,
}


export default interface IDiagram extends IEventProvider<DiagramEvent, DiagramEventData>
{
	
	observableState: IDiagramState;
	
	/**
	 * Установить состояние диаграммы, соответствующее химическому элементу с указанным порядковым номером
	 * @param number Номер химического элемента в периодической таблице
	 */
	setElementByNumber( number: number ): void;

	mode: InteractionMode;

	/**
	 * Переключить состояние ячейки на противоположное
	 * @param quantumNumbers 4 квантовых числа
	 * @returns Состояние ячейки, в которое она перешла
	 */
	toggleCell( quantumNumbers: CellQN ): boolean;

	/**
	 * Переключить состояние всех ячеек блока (корабля) на противоположное
	 * 
	 * ▯▯ ▯▯ ▯▯ --> ▮▮ ▮▮ ▮▮
	 * 
	 * ▮▯ ▮▯ ▯▯ --> ▮▮ ▮▮ ▮▮
	 * 
	 * ▮▮ ▮▮ ▮▮ --> ▯▯ ▯▯ ▯▯
	 * @param quantumNumbers 2 квантовых числа (n, l)
	 * @returns Состояние заполненности блока, в которое он перешел
	 */
	toggleBlock( quantumNumbers: BlockQN ): boolean;

	/**
	 * Установить состояние ячейки (выбрана или нет)
	 * @param qn Квантовые числа ячейки
	 * @param state Состояние, в которое ее нужно переключить
	 */
	setSpin( qn: CellQN, state: boolean ): void;

	/**
	 * Сравнить на эквивалентность состояние диаграммы и переданную конфигурацию
	 * @param config Состояние диаграммы в битовом представлении
	 */
	isEqual( config: ElemConfig ): boolean;

	/**
	 * Совершить выстрел по ячейке
	 * @param quantumNumbers 4 квантовых числа
	 * @returns Результат выстрела: попал или нет. Если диаграмма не установлена или в данную ячейку уже был произведен выстрел, то функция возвращает `false` и не инициирует событие выстрела.
	 */
	fire( quantumNumbers: CellQN ): boolean;

	/**
	 * Отмечена ли ячейка диаграммы
	 * @param qn Проверяемая ячейка диаграммы
	 */
	hasSpin( qn: CellQN ): boolean;

	/**
	 * Установить состояние диаграммы
	 */
	setState( config: ElemConfig ): void;

	/** Отчистить диаграмму и выстрелы */
	reset(): void;

	/** Отметить элементы диаграммы */
	highlight( quantumNumbers: QNStringScheme ): void;
}