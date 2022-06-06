import type IStopwatch from "./StopwatchInterface";

type Milliseconds = number;
type Timestamp = Milliseconds;


class Stopwatch implements IStopwatch
{
	#counter: Milliseconds;
	#checkpoint: Timestamp;

	constructor( startValue: Milliseconds | Date = 0 )
	{
		this.#counter = startValue instanceof Date
							? startValue.getTime()
							: ( startValue <= 0 ? 0 : Math.floor( startValue ) );
		this.#checkpoint = 0;
	}

	start(): IStopwatch
	{
		if( this.isRunning )
			return this;

		this.#checkpoint = Date.now();
		return this;
	}

	stop()
	{
		if( !this.isRunning )
			return this;

		this.#counter += Date.now() - this.#checkpoint;
		this.#checkpoint = 0;
		return this;
	}

	reset()
	{
		this.#checkpoint = 0;
		this.#counter = 0;
		return this;
	}

	get isRunning(): boolean
	{
		return this.#checkpoint !== 0;
	}

	get value(): Milliseconds
	{
		return this.#checkpoint
				? this.#counter + ( Date.now() - this.#checkpoint )
				: this.#counter;
	}

	toString(): string
	{
		const time: Milliseconds = this.value;
		return `${_2digit( time / 3600000 % 60 )}:${_2digit( time / 60000 % 60 )}:${_2digit(time / 1000 % 60)}`;
	}
}


function _2digit( value: number ): string
{
	return (value >= 10 ? '' : '0') + Math.floor( value ).toString();
}



export default Stopwatch;

export type {
	IStopwatch,
}