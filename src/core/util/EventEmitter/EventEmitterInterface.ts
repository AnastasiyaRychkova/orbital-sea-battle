import IEventProvider from './EventProviderInterface';

interface IEventEmitter<T extends string, D> extends IEventProvider<T, D>
{
	emit( event: string, data?: D ): IEventEmitter<T, D>;
}

export default IEventEmitter;