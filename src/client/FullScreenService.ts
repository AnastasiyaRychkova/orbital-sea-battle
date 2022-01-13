import { action, makeObservable, observable } from "mobx";

export type FullScreenServiceType = {
	isOn: boolean,
	toggle: () => void,
}


class FullScreenService
{
	isOn: boolean = false;
	#requestFullScreen?: (options?: FullscreenOptions | undefined) => Promise<void>;
	#cancelFullScreen?: () => Promise<void>;

	constructor()
	{
		makeObservable( this, {
			isOn: observable,

			toggle: action.bound,
			_changeHandler: action.bound,
		});

		this.#requestFullScreen = this._defineRequestFullscreenMethod();
		this.#cancelFullScreen = this._defineCancelFullscreenMethod();

		window.document.addEventListener(
			'fullscreenchange',
			this._changeHandler,
		);
	}

	private _defineRequestFullscreenMethod(): ((options?: FullscreenOptions | undefined) => Promise<void>) | undefined
	{
		const doc = document.documentElement;
		return doc.requestFullscreen
				|| (doc as any).mozRequestFullScreen
				|| (doc as any).webkitRequestFullScreen
				|| (doc as any).msRequestFullscreen;
	};

	private _defineCancelFullscreenMethod(): (() => Promise<void>) | undefined
	{
		const doc = window.document;
		return doc.exitFullscreen
				|| (doc as any).mozCancelFullScreen
				|| (doc as any).webkitExitFullscreen
				|| (doc as any).msExitFullscreen;
	};
	
	toggle()
	{
		if( this.isOn )
		{
			this.#cancelFullScreen?.call( window.document )
				.catch( ( error: Error ) => {
					console.warn( error.message );
				} );
		}
		else
		{
			this.#requestFullScreen?.call( document.documentElement )
				.then(() => {
					if( window.screen.orientation.lock )
						window.screen.orientation.lock( 'landscape' )
							.catch( ( error: Error ) => {
								console.log( error.message );
							} );
					else
						(window.screen as any).lockOrientation( 'landscape' );
						
				})
				.catch( ( error: Error ) => {
					console.warn( error.message );
				} );
		}
	}

	_changeHandler()
	{
		this.isOn = document.fullscreenElement != null;
	}

}

const fullScreenService = new FullScreenService();

export default fullScreenService;