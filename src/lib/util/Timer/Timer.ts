import ITimer from "./TimerInterface";

type Seconds = number;

class Timer implements ITimer
{
	#timerID: any;
	
	constructor()
	{
		this.#timerID = 0;
	}

	start( callback: Function, delay: Seconds = 0, ...args: any[] ): void
	{
		if( this.#timerID )
			this._clearTimer();
		this.#timerID = setTimeout(
			( ...args: any[] ) => {
				callback( ...args );
				this.#timerID = 0;
			},
			delay * 1000,
			...args
		);
	}

	private _clearTimer(): void
	{
		clearTimeout( this.#timerID );
		this.#timerID = 0;
	}

	stop(): void
	{
		if( this.#timerID )
			this._clearTimer();
	}

	isRunning(): boolean
	{
		return this.#timerID !== 0;
	}
}



export default Timer;