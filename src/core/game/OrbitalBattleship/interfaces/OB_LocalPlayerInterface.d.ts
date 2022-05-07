import type { BlockQN, CellQN, ChemicalElement } from '../../Services/Chemistry';
import type IEventProvider from "../../../util/EventEmitter/EventProvider";
import type { IDiagram, OB_IPlayer } from '../OB_Entities';
import type { PlayerEvent, PlayerResults } from '../types';


/**
 * __Локальный игрок__
 * 
 * Создает события:
 * - `selection` — Выбор элемента: _{elementNumber: number}_
 */
interface OB_ILocalPlayer extends OB_IPlayer
{
	/** Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	selectedElement: ChemicalElement | null;

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
	 * @returns Результат выстрела: попадание (true) или промах (false)
	 */
	markEnemyShot( cell: CellQN ): boolean

	/**
	 * Отметить выстрел, который совершил противник, по полю локального игрока
	 * @param cell Координаты ячейки диаграммы противника, по которой игрок сделал выстрел
	 * @param result Результат выстрела: попадание (true) или промах (false)
	 */
	markShotResult( cell: CellQN, result: boolean ): void;

	/**
	 * Этот элемент загадал?
	 * @param elemNumber Периодический номер предполагаемого элемента
	 * @returns Этот ли элемент загадал игрок
	 */
	isThisElementSelected( elemNumber: number ): boolean;

	/**
	 * Завершить играть. После этого метод получения загаданного элемента вместо undefined
	 * возвращает само значение, а остальные игровые методы перестают работать.
	 * Можно вызвать только 1 раз за всю жизнь объекта.
	 */
	finishGame(): void;


	/**
	 * Результаты игры.
	 * 
	 * Возвращает объект только после вызова `finishGame`
	 */
	getResults(): PlayerResults | undefined;
}


export default OB_ILocalPlayer;