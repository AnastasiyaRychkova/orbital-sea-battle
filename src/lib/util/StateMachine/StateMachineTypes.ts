import ITimer from "../Timer/TimerInterface";

type Seconds = number;

export type TerminalStr = '__END__';
export const TERMINAL = '__END__'

/** Название состояния */
// export type StateName = string;

/** Название события */
// export type EventName = string;

/** Side-effect function
 * @param state Текущее состояние автомата
 * @param context Контекст-объект текущего конечного автомата
 */
export type ActionFunction<StateName extends string> = ( state: StateName, context?: object ) => void;


// --- Initialization configurations ---

/** Описание перехода в другое состояние */
export type Transition<StateName extends string> = {
	/** Конечное состояние */
	to: StateName | TerminalStr,

	/** Side-effect function
	 * 
	 * *Вызывается после перехода*
	 */
	do?: ActionFunction<StateName>
};

/** Описание отложенного перехода в другое состояние */
export type DelayedTransitionConfig<StateName extends string> = {
	after: Seconds
} & Transition<StateName>;

/** Объект отложенного перехода */
export type DelayedTransition<StateName extends string> = {
	timeout: ITimer
} & DelayedTransitionConfig<StateName>;


/** Описание состояний конечного автомата */
export type StateListConfig<StateName extends string, EventName extends string> = {
	[key in StateName]: StateNodeConfig<StateName, EventName>;
};

/** Описание конечного автомата. Объект для инициализации */
export type MachineConfig<StateName extends string, EventName extends string> = {
	/** Название начального состояния */
	initial: StateName,

	/** Состояния автомата */
	states: StateListConfig<StateName, EventName>,

	/** Название состояния родительского автомата, в которое нужно его перевести после окончания работы текущего */
	onDone?: StateName,

	/** Функция, вызываемая при запуске автомата */
	entry?: ActionFunction<StateName>,

	/** Функция, вызываемая по окончании работы автомата */
	exit?: ActionFunction<StateName>,

	/** Контекстный-объект передаваемый в во все  */
	context?: object,
};

/** Список событий, которые могут инициализировать переход в другое состояние */
export type EventListConfig<StateName extends string, EventName extends string> = {
	[key in EventName]?: StateName | TerminalStr | Transition<StateName>;
};

/** Описание состояния */
export type StateNodeConfig<StateName extends string, EventName extends string> = {
	/** Вложенный автомат, который запуститься с начала после перехода в текущее состояние */
	invoke?: MachineConfig<StateName, EventName>,

	/** События, которые могут инициировать переход в другое состояние */
	on?: EventListConfig<StateName, EventName>,

	/** Автоматический переход в другое состояние после перехода в текущее 
	 * через заданный промежуток времени */
	delay?: DelayedTransitionConfig<StateName>,

	/** Функция, которая всегда вызывается после перехода в данное состояние.
	 * 
	 * StateNode[entry] --> Transition[do] --> Machine[entry]
	 */
	entry?: ActionFunction<StateName>,

	/** Функция, которая всегда вызывается после перехода в данное состояние.
	 * 
	 * StateNode[exit] --> Machine[exit]
	 */
	 exit?: ActionFunction<StateName>,
};


// --- State Machine Types ---

/** Конечный автомат */
export type MachineNode<StateName extends string, EventName extends string> = {
	/*
	#states: Map<StateName, StateNode<StateName, EventName>,
	#current: StateName,
	#initial: StateName,
	#onDone?: EventName,
	#entry?: ActionFunction<StateName>,
	#exit?: ActionFunction<StateName>,
	#context?: object,
	#parent?: MachineNode<StateName, EventName>,
	*/

	/** Инициировать событие в данном конечном автомате */
	send: ( event: EventName ) => StateName|TerminalStr,
};

/** Состояние — звено конечного автомата */
export type StateNode<StateName extends string, EventName extends string> = {
	/** Название */
	value: StateName,

	/** События, которые могут быть инициированы в данном состоянии */
	events?: Map<EventName, Transition<StateName|TerminalStr>>,

	/** Вложенный автомат */
	invoke?: MachineNode<StateName, EventName>,

	/** Автоматический переход в другое состояние после перехода
	 * в текущее через заданный промежуток времени */
	delay?: DelayedTransition<StateName>,

	/** Функция, которая всегда вызывается после перехода в данное состояние.
	 * 
	 * StateNode[entry] --> Transition[do] --> Machine[entry]
	 */
	entry?: ActionFunction<StateName>,

	/** Функция, которая всегда вызывается после перехода в данное состояние.
	 * 
	 * StateNode[exit] --> Event: Transition[do] --> Machine[exit]
	 */
	exit?: ActionFunction<StateName>,
};
