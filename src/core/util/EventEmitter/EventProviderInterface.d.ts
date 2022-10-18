export type EventData<D> = {
	detail: D,
};

export type ListenerFunc<D> = ( data: EventData<D> ) => void;

interface IEventProvider<T extends string, D>
{
	on( event: T, func: ListenerFunc<D> ): IEventProvider<T, D>;

	once( event: T, func: ListenerFunc<D> ): IEventProvider<T, D>;

	remove( event: T, func: ListenerFunc<D> ): IEventProvider<T, D>;
}


export default IEventProvider;