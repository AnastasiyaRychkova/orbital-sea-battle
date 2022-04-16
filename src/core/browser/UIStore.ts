import { action, makeObservable, observable } from "mobx";
import Browser from './Browser';


class UiStore
{
	mobile: boolean = false;
	lang = 'ru';

	#windowSize = {
		width: 0,
		height: 0,
	};

	readonly MOBILE_BREAKPOINT = 540;
	readonly mobileDevice: boolean;

	constructor() {
		makeObservable(
			this,
			{
				mobile: observable,

				checkDeviceTypeStatus: action,
			}
		);

		this.mobileDevice = Browser.device === 'mobile';
		this.updateWindowSize();
		this.checkDeviceTypeStatus();

		window.addEventListener(
			'resize',
			this.handleWindowResize,
		);
	}
	
	handleWindowResize = () => {
		this.updateWindowSize();
		this.checkDeviceTypeStatus();
	}

	updateWindowSize()
	{
		this.#windowSize.width = window.innerWidth;
		this.#windowSize.height = window.innerHeight;
	}

	checkDeviceTypeStatus(): void
	{
		this.mobile = this.mobileDevice || this.#windowSize.width < this.MOBILE_BREAKPOINT;
	}
}
/*--------------------------*/


const uiStore = new UiStore();


export default uiStore;