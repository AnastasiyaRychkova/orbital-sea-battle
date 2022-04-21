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
	start(): void;

	/** Метод завершения игры.
	 * 
	 * Вызывается для отчистки памяти или отправки сообщений перед сменой адреса страницы.
	 */
	end(): void;
}


export default IGame;