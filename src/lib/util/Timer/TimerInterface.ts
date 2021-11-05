type Seconds = number;

interface ITimer
{
	start( callback: Function, delay: Seconds, ...args: any[] ): void;

	stop(): void;

	isRunning(): boolean;
}


export default ITimer;