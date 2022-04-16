import IEventProvider from "../../util/EventEmitter/EventProviderInterface";
import { EDiagramCellState } from "../ChemicalElement/DiagramCell";
import type { CellQN, BlockQN, QNStringScheme
} from "../ChemicalElement/QuantumNumbers";
import { StateType } from "./DObjectState";
import { ElemConfig } from '../Services/Chemistry';


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
}


export default interface IDiagram extends IEventProvider<DiagramEvent, DiagramEventData>
{
	
	observableState: StateType;
	
	/**
	 * Установить состояние диаграммы, соответствующее химическому элементу с указанным порядковым номером
	 * @param number Номер химического элемента в периодической таблице
	 */
	setElementByNumber( number: number ): void;

	/** Доступна ли диаграмма для игровых изменений
	 * 
	 * *Диаграмму можно изменять, используя сеттеры*
	 */
	disabled: boolean;

	/**
	 * 🎲 Переключить состояние ячейки на противоположное
	 * @param quantumNumbers 4 квантовых числа
	 * @returns Состояние ячейки, в которое она перешла
	 */
	toggleCell( quantumNumbers: CellQN ): boolean;

	/**
	 * 🎲 Переключить состояние всех ячеек блока (корабля) на противоположное
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
	 * 🎲 Совершить выстрел по ячейке
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