import type { IEventProvider } from '../../util/types';
import type { EAchievementType } from './AchievementsDescription';

type PlayerType = {
	isThisElementSelected?( elemNumber: number ): boolean | Promise<boolean>,
} & IEventProvider<string, any>;

/**
 * Игра должна по окончании производить событие `end`, чтобы Достижения могли отписаться от прослушивания всех объектов.
 */
export type GameType = {
	player: PlayerType,
	enemy?: PlayerType,
} & IEventProvider<string, any>;


/**
 * Сущность достижения, которая отслеживает игру
 */
interface IAchievement
{
	/**
	 * Подписаться на события игры и ее компонентов.
	 * 
	 * Если задание выполнено, то при вызове метода объект НЕ будет слушать игру.
	 * @param game Игра, которую можно прослушивать
	 */
	listenGame( game: GameType ): void;

	/** Получено ли достижение */
	isCompleted(): boolean;

	/** Сохранить состояние в браузере */
	save(): void;

	/** Краткое название */
	title: string;

	/** Описание задания */
	description: string;

	/** Тип: 
	 * * одиночное (`singleton`)
	 * * счетчик (`counter`)
	 * * счетчик с уровнями (`multiCounter`)
	*/
	type: EAchievementType;

	/** Если тип — multi-counter, то текущий уровень.
	 * В противном случае — 1
	 */
	level: number;

	/** Цель для counter и multi-counter. Для singleton равно 0 */
	goal: number;

	/** Достигнутое значение (<= goal). Для singleton равно 0 */
	value: number;
}


export default IAchievement;