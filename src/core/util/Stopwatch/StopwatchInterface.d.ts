type Milliseconds = number;


/**
 * Секундомер
 * 
 * Поддерживается инициализация начального значения в миллисекундах.
 * Значение возвращается в миллисекундах.
 * Строковое значение вернется в формате `hh:mm:ss`.
 */
interface IStopwatch
{
	/** Запустить таймер */
	start(): IStopwatch

	/** Остановить таймер. Значение сброшено не будет. */
	stop(): IStopwatch

	/** Остановить и сбросить до нуля. */
	reset(): IStopwatch

	/** Работает отсчет времени. */
	isRunning: boolean

	/** Текущее значение секундомера в миллисекундах. */
	value: Milliseconds

	/** Текущее значение секундомера в формате `hh:mm:ss`. */
	toString(): string
}


export default IStopwatch;