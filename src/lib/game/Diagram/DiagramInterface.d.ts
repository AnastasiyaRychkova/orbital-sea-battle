import IEventProvider from "../../util/EventEmitter/EventProviderInterface";
import { EDiagramCellState } from "../ChemicalElement/DiagramCell";
import type { CellQN, ShipQN, QNStringScheme
} from "../ChemicalElement/QuantumNumbers";
import { StateType } from "./ObjectState.d";


/** События, которые генерирует диаграмма */
export type DiagramEvent = | 'changed'
							| 'shot'
							| 'disabled'
							| 'enabled';

export type DiagramEventData = {
	type?: 'cell' | 'ship',
	index?: number,
	isReShot?: boolean,
	qn: CellQN | ShipQN,
}


export default interface IDiagram extends IEventProvider<DiagramEvent>
{
	
	observableState: StateType;

	/**
	 * Был ли последний выстрел произведен в данную ячейку
	 * @param quantumNumbers 4 квантовых числа
	 */
	isLastShot( quantumNumbers: CellQN ): boolean
	
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
	 */
	toggleCell( quantumNumbers: CellQN ): void;

	/**
	 * 🎲 Переключить состояние всех ячеек блока (корабля) на противоположное
	 * 
	 * ▯▯ ▯▯ ▯▯ --> ▮▮ ▮▮ ▮▮
	 * 
	 * ▮▯ ▮▯ ▯▯ --> ▮▮ ▮▮ ▮▮
	 * 
	 * ▮▮ ▮▮ ▮▮ --> ▯▯ ▯▯ ▯▯
	 * @param quantumNumbers 2 квантовых числа (n, l)
	 */
	toggleShip( quantumNumbers: ShipQN ): void;

	/**
	 * 🎲 Совершить выстрел по ячейке
	 * @param quantumNumbers 4 квантовых числа
	 */
	aim( quantumNumbers: CellQN ): void;

	// TODO: Определиться: нужен ли метод? входные параметры?
	/**
	 * Установить состояние диаграммы
	 */
	setState( /* Config */ ): void;

	/** Отчистить диаграмму и выстрелы */
	reset(): void;

	/** Отметить элементы диаграммы */
	highlight( quantumNumbers: QNStringScheme ): void;
}