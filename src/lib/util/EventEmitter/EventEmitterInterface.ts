import IEventProvider from './EventProviderInterface';

interface IEventEmitter<T extends string, D> extends IEventProvider<T>
{
	emit( event: string, data?: D ): IEventEmitter<T, D>;
}

export default IEventEmitter;