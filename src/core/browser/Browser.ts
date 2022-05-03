import IBrowser from "./BrowserInterface";
import browserStorage from "./BrowserStorage";
import fullScreenService, { FullScreenServiceType } from "./FullScreenService";



class Browser implements IBrowser
{
	device!: "desktop" | "tablet" | "mobile";
	fullScreen: FullScreenServiceType;

	constructor()
	{
		this.defineDevice();
		this.fullScreen = fullScreenService;
	}

	defineDevice()
	{
		if( navigator.userAgent.match(/Tablet|iPad/i ) )
		{
			this.device = 'tablet';
		}
		else if( navigator.userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i) )
		{
			this.device = 'mobile';
		} else {
			this.device = 'desktop';
		}
	}

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


	onTabClose( callback: () => void ): void
	{
		window.addEventListener( 'unload', callback );
	}

	sendInBackground( to: string, data: FormData ): void
	{
		navigator.sendBeacon( to, data );
	}

	get storage()
	{
		return browserStorage;
	}
}

const browserInstance = new Browser();

export default browserInstance;