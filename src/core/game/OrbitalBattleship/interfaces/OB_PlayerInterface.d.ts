import { IEventProvider } from '../../../util/types';
import type { CellQN } from '../../Chemistry/types';
import type { IDiagram, IShotsAnalyzer, User } from "../OB_Entities";
import type { PlayerResults, PlayerEvent, PlayerEventData } from '../types';


interface OB_IPlayer extends IEventProvider<PlayerEvent, PlayerEventData>
{
	user: User;
	
	shotsAnalyzer: IShotsAnalyzer;

	diagram: IDiagram | null,

	/**
	 * Был ли совершен выстрел по ячейке диаграммы игрока
	 * @param cell Координаты ячейки диаграммы игрока
	 * @returns Наличие выстрела в ячейку диаграммы игрока
	 */
	hasShot( cell: CellQN ): boolean;

	/**
	 * Установка объекта состояния диаграммы снаружи класса.
	 * Позволяет установить тот экземпляр класса,
	 * который подходит для пользовательского интерфейса,
	 * что делает LocalPlayer независимым от интерфейса.
	 * @param diagram Диаграмма
	 */
	setDiagram( diagram: IDiagram ): void;

		/**
	 * Отметить выстрел, который совершил противник, по полю локального игрока
	 * @param cell Координаты ячейки диаграммы противника, по которой игрок сделал выстрел
	 * @param result Результат выстрела: попадание (true) или промах (false)
	 */
	markShotResult( cell: CellQN, result: boolean ): void;

	/**
	 * Завершение игры. После вызова доступно получение объекта с данными об игре,
	 * в том числе и загаданный игроком элемент.
	 */
	finishGame(): void;

	/**
	 * Получить объект с результатами игры. 
	 * До вызова метода `finishGame()` возвращает `undefined`.
	 */
	getResults(): PlayerResults | undefined;

	/**
	 * Были ли выбран элемент игроком
	 */
	hasSelectedElement: boolean;

	isThisElementSelected( elemNumber: number ): boolean | Promise<boolean>;
}


export default OB_IPlayer;