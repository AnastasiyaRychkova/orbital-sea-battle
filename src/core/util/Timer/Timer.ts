import type { ITimer } from "./types";

type Seconds = number;

class Timeout implements ITimer
{
	#id: any;
	
	constructor()
	{
		this.#id = 0;
	}

	start(
		callback: Function,
		delay: Seconds = 0,
		...args: any[]
	): void
	{
		if( this.#id )
			this._clearTimer();

		this.#id = setTimeout(
			( ...args: any[] ) => {
				callback( ...args );
				this.#id = 0;
			},
			delay * 1000,
			...args
		);
	}

	private _clearTimer(): void
	{
		clearTimeout( this.#id );
		this.#id = 0;
	}

	stop(): void
	{
		if( this.#id )
			this._clearTimer();
	}

	isRunning(): boolean
	{
		return this.#id !== 0;
	}
}

const Timer = {
	create(): ITimer
	{
		return new Timeout();
	}
};


export default Timer;

export type { ITimer };