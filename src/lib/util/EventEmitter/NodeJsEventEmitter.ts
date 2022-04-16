import { EventEmitter } from "events";
import IEventEmitter from "./EventEmitterInterface";
import { ListenerFunc } from "./EventProviderInterface";

class NodeJsEventEmitter<T extends string, D>implements IEventEmitter<T, D>
{
	#emitter: EventEmitter;

	constructor()
	{
		this.#emitter = new EventEmitter();
	}

	on( event: T, callback: ListenerFunc<D>): IEventEmitter<T,D>
	{
		this.#emitter.on(
			event,
			callback,
		);
		return this;
	}

	once( event: T, callback: ListenerFunc<D>): IEventEmitter<T,D>
	{
		this.#emitter.once(
			event,
			callback,
		);
		return this;
	}

	emit( event: T, data?: D ): IEventEmitter<T,D>
	{
		this.#emitter.emit( 
			event, 
			{ detail: data }
		);
		return this;
	}

	remove( event: T, callback: ListenerFunc<D> ): IEventEmitter<T,D>
	{
		this.#emitter.removeListener( event, callback );
		return this;
	}
}



export default NodeJsEventEmitter;