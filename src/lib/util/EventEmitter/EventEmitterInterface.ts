interface EventEmitterInterface
{
	on( event: string, func: Function ): EventEmitterInterface;

	once( event: string, func: Function ): EventEmitterInterface;

	emit( event: string, data?: object ): EventEmitterInterface;

	remove( event: string, func: Function ): EventEmitterInterface;
}

export default EventEmitterInterface;