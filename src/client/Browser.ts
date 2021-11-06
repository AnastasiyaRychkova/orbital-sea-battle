import IBrowser from "./BrowserInterface";

class Browser implements IBrowser
{
	constructor() {}

	/**
	 * Добавить на закрывание вкладки модальное окно с подтверждением
	 */
	preventTabClose()
	{
		window.onbeforeunload = function() {
			return 'Вы уверены, что хотите покинуть страницу? Эксперимент еще не завершился 😢';
		}
	}

	/**
	 * Позволить пользователю закрывать вкладку без подтверждения
	 */
	permitTabClose()
	{
		window.onbeforeprint = function() {
			return true;
		}
	}
}

const browserInstance = new Browser();

export default browserInstance;