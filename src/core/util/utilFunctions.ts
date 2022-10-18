import Stopwatch from "./Stopwatch";
import type { IStopwatch } from "./Stopwatch/types";

export function randomInRange( from: number, to: number ): number
{
	return (to - from) * Math.random() + from;
}

export function randomBool(): boolean
{
	return Math.random() > 0.5;
}

export function randomIndex( maxIndex: number ): number
{
	return Math.round( Math.random() * maxIndex );
}

export function promiseWithError<T>( message: string ): Promise<T>
{
	return new Promise<T>( ( resolve, reject ) => { 
		reject( new Error( message ) )
	} );
}

export function promiseWithValue<T>( value: T ): Promise<T>
{
	return new Promise<T>( ( resolve ) => {
		resolve( value );
	} );
}

export function stopwatch( value?: number | Date ): IStopwatch
{
	return new Stopwatch( value );
}
