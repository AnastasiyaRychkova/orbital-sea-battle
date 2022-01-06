interface IEventProvider<T extends string>
{
	on( event: T, func: Function ): IEventProvider<T>;

	once( event: T, func: Function ): IEventProvider<T>;

	remove( event: T, func: Function ): IEventProvider<T>;
}


export default IEventProvider;