import type User from "./User";

interface IGame
{
	/** Название игры */
	name: string;

	/** Краткое описание игры */
	// description: string;

	/** Часть URL-адреса после id пользователя */
	path: string;

	/** Метод инициализации игры.
	 * 
	 * Вызывается после смены адреса страницы.
	 */
	start( user: User ): IGame;

	/** Метод завершения игры.
	 * 
	 * Вызывается для отчистки памяти или отправки сообщений перед сменой адреса страницы.
	 */
	end(): IGame;

	/**
	 * Добавление слушателя на событие окончания игры
	 */
	onComplete( callback: () => void ): IGame;
}


export default IGame;