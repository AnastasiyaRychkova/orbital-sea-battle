import EventEmitterInterface from "./EventEmitterInterface";
// FIXME: Браузерный emitter возвращает CustomEvent, а не переданные значения
class BrowserEventEmitter extends EventTarget implements EventEmitterInterface
{
	constructor()
	{
		super();
	}

	on( event: string, callback: Function): EventEmitterInterface
	{
		this.addEventListener(
			event,
			callback as EventListener,
		);
		return this;
	}

	once( event: string, callback: Function): EventEmitterInterface
	{
		this.addEventListener(
			event,
			callback as EventListener,
			{
			once: true,
			}
		);
		return this;
	}

	emit( event: string, data?: object ): EventEmitterInterface
	{
		this.dispatchEvent( new CustomEvent( event, {
			detail: data,
		} ) );
		return this;
	}

	remove(event: string, callback: Function): EventEmitterInterface
	{
		this.removeEventListener( event, callback as EventListener );
		return this;
	}
}



export default BrowserEventEmitter;