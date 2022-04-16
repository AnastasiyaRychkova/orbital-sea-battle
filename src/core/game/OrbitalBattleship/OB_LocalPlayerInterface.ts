import type { BlockQN, CellQN } from '../Services/Chemistry';
import type IEventProvider from "../../util/EventEmitter/EventProvider";
import IDiagram from "../Diagram/DiagramInterface";

interface OB_ILocalPlayer extends IEventProvider<string, object>
{
	/** Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	selectedElement: number;

	/**
	 * Загадать элемент для игры
	 * @param elemNumber Номер химического элемента в Периодической таблице
	 */
	selectElement( elemNumber: number ): void

	/**
	 * Установка объекта состояния диаграммы снаружи класса.
	 * Позволяет установить тот экземпляр класса,
	 * который подходит для пользовательского интерфейса,
	 * что делает LocalPlayer независимым от интерфейса.
	 * @param diagram Диаграмма
	 */
	setDiagram( diagram: IDiagram): void

	// fireShot( cell: CellQN ): void
	
	/**
	 * Переключить состояние блока целиком на противоположное.
	 * Если блок заполнен частично, то он будет заполнен целиком.
	 * @param block Квантовые числа, определяющие блок на диаграмме
	 */
	toggleBlock( block: BlockQN ): void

	/**
	 * Переключить состояние ячейки на противоположное.
	 * @param cell Квантовые числа, определяющие ячейку на диаграмме
	 */
	toggleCell( cell: CellQN ): void

	/**
	 * Проверить заполнение диаграммы: соответствует ли диаграмма выбранному элементу.
	 * @returns Правильность заполнения диаграммы
	 */
	diagramFilledOutCorrectly(): boolean

	/**
	 * Отметить выстрел соперника на диаграмме игрока.
	 * Диаграмма инициирует событие `shot`.
	 * @param cell Ячейка диаграммы, в которую стреляют
	 */
	markEnemyShot( cell: CellQN ): boolean

	/**
	 * Этот элемент загадал?
	 * @param elemNumber Периодический номер предполагаемого элемента
	 * @returns Этот ли элемент загадал игрок
	 */
	isThisElementSelected( elemNumber: number ): boolean
}


export default OB_ILocalPlayer;