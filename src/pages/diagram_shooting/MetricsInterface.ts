export type MetricsData = Interval[];

type TimeStamp = number;
type Milliseconds = number;

export type Interval = {
	start: TimeStamp,
	end: TimeStamp,
	duration: Milliseconds,
	clicks: Click[],
};

/**
 * Координаты клика в процентах от ширины и высоты экрана [0;1]
 */
export type Click = [ number, number ];

interface IMetrics
{
	/** Начать сбор статистики */
	start(): void;

	/** Завершить сбор статистики */
	stop(): void;

	/** Поставить временную отметку, добавив новый интервал сбора */
	addMark(): void;

	/** Получить собранные данные */
	export(): MetricsData;

	/** Остановить сбор статистики и отчистить хранилище */
	reset(): void;
}


export default IMetrics;