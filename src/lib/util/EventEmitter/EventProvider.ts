import EventEmitter, { IEventEmitter } from "./EventEmitter";
import IEventProvider, { ListenerFunc, EventData } from "./EventProviderInterface";

class EventProvider<T extends string, D extends object> implements IEventProvider<T, D>
{
	protected emitter: IEventEmitter<T,D>;

	constructor()
	{
		this.emitter = new EventEmitter<T,D>();
	}

	on( event: T, func: ListenerFunc<D> ): IEventProvider<T, D>
	{
		return this.emitter.on( event, func );
	}

	once( event: T, func: ListenerFunc<D> ): IEventProvider<T, D>
	{
		return this.emitter.once( event, func );
	}
	
	remove( event: T, func: ListenerFunc<D> ): IEventProvider<T, D>
	{
		return this.emitter.remove( event, func );
	}
	
	protected _emit( event: T, data?: D ): IEventEmitter<T,D>
	{
		return this.emitter.emit( event, data );
	}
}



export default EventProvider;

export type {
	EventData,
	IEventProvider,
}