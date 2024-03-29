import IEventEmitter from "./EventEmitterInterface";
import { ListenerFunc } from "./EventProviderInterface";
// FIXME: Браузерный emitter возвращает CustomEvent, а не переданные значения
class BrowserEventEmitter<T extends string, D> extends EventTarget implements IEventEmitter<T, D>
{
	constructor()
	{
		super();
	}

	on( event: T, callback: ListenerFunc<D>): IEventEmitter<T,D>
	{
		this.addEventListener(
			event,
			callback as unknown as EventListener,
		);
		return this;
	}

	once( event: T, callback: ListenerFunc<D>): IEventEmitter<T,D>
	{
		this.addEventListener(
			event,
			callback as unknown as EventListener,
			{
			once: true,
			}
		);
		return this;
	}

	emit( event: T, data?: D ): IEventEmitter<T,D>
	{
		this.dispatchEvent( new CustomEvent( event, {
			detail: data,
		} ) );
		return this;
	}

	remove( event: T, callback: ListenerFunc<D> ): IEventEmitter<T,D>
	{
		this.removeEventListener( event, callback as unknown as EventListener );
		return this;
	}
}



export default BrowserEventEmitter;