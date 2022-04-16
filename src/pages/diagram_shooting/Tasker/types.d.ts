import IEventProvider from "../../../core/util/EventEmitter/EventProviderInterface";

export type EventType<EventData> = {
	detail: EventData,
};

export type Timestamp = number;


export type TaskConfig<TaskScheme, EventData> = {
	target: IEventProvider<string>,
	event: string,
	tasks: TaskScheme[],
	checker: ( eventData: EventData, expected: TaskScheme ) => boolean,
	infallibility: boolean,
	entry: ( expected: TaskScheme ) => void,
	exit: () => void,
	delay: number,
	cost?: number,
	bonusTime?: number,
	bonusCost?: number
};


export type TaskResult = {
	duration: number,
	result: boolean,
	attempts: number,
};

export type TaskerEvent = 'complete';
export type TaskerEventData = {
	results: TaskResult[],
	right: number,
	duration: number,
	total: number,
};

export type TaskerEventObject = EventType<TaskerEventData>;

export type Digest = {
	total: number,
	right: number,
	completed: number,
	done: boolean,
	startTime: Timestamp,
};