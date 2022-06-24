type Seconds = number;

export interface ITimer
{
	start( callback: Function, delay: Seconds, ...args: any[] ): void;

	stop(): void;

	isRunning(): boolean;
}
