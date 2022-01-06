import EventEmitter from "./EventEmitter";
import IEventEmitter from "./EventEmitterInterface";
import IEventProvider from "./EventProviderInterface";

class EventProvider<T extends string, D extends object> implements IEventProvider<T>
{
	protected emitter: IEventEmitter<T,D>;

	constructor()
	{
		this.emitter = new EventEmitter();
	}

	on( event: T, func: Function ): IEventProvider<T>
	{
		return this.emitter.on( event, func );
	}

	once( event: T, func: Function ): IEventProvider<T>
	{
		return this.emitter.once( event, func );
	}
	
	remove( event: T, func: Function ): IEventProvider<T>
	{
		return this.emitter.remove( event, func );
	}
	
	protected _emit( event: T, data?: D ): IEventEmitter<T,D>
	{
		return this.emitter.emit( event, data );
	}
}



export default EventProvider;