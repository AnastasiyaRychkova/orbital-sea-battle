export type TERMINAL = '__END__';

/** Название состояния */
export type StateName = string;

/** Название события */
export type EventName = string;

/** Side-effect function
 * @param state Текущее состояние автомата
 * @param context Контекст-объект текущего конечного автомата
 */
export type ActionFunction = ( state: StateName, context?: object ) => void;


// --- Initialization configurations ---

/** Описание перехода в другое состояние */
export type Transition = {
	/** Конечное состояние */
	to: StateName,

	/** Side-effect function
	 * 
	 * *Вызывается после перехода*
	 */
	do?: ActionFunction
};

/** Описание отложенного перехода в другое состояние */
export type DelayedTransitionConfig = {
	after: number
} & Transition;

/** Объект отложенного перехода */
export type DelayedTransition = {
	timeoutId: number
} & DelayedTransitionConfig;

/** Описание состояний конечного автомата */
export type StateListConfig = {
	[key: StateName]: StateNodeConfig
};

/** Описание конечного автомата */
export type MachineConfig = {
	/** Название начального состояния */
	initial: StateName,

	/** Состояния автомата */
	states: StateListConfig,

	/** Название состояния родительского автомата, в которое нужно его перевести после окончания работы текущего */
	onDone?: StateName,

	/** Функция, вызываемая при запуске автомата */
	entry?: ActionFunction,

	/** Функция, вызываемая по окончании работы автомата */
	exit?: ActionFunction,

	/** Контекстный-объект передаваемый в во все  */
	context: object,
};

/** Список событий, которые могут инициализировать переход в другое состояние */
export type EventListConfig = {
	[key: EventName]: StateName | TERMINAL | Transition
};

/** Описание состояния */
export type StateNodeConfig = {
	/** Вложенный автомат, который запуститься с начала после перехода в текущее состояние */
	invoke?: MachineConfig,

	/** События, которые могут инициировать переход в другое состояние */
	on?: EventListConfig,

	/** Автоматический переход в другое состояние после перехода в текущее через заданный промежуток времени */
	delay?: DelayedTransitionConfig,
};


// --- State Machine Types ---

/** Конечный автомат */
export type MachineNode = {
	#states: Map<StateName, StateNode>,
	#current: StateName,
	#initial: StateName,
	#onDone?: EventName,
	#entry?: ActionFunction,
	#exit?: ActionFunction,
	#context?: object,
	#parent?: MachineNode,

	/** Инициировать событие в данном конечном автомате */
	send: ( event: EventName ) => StateName,
};

/** Состояние — звено конечного автомата */
export type StateNode = {
	/** Название */
	value: StateName,

	/** События, которые могут быть инициированы в данном состоянии */
	events?: Map<EventName, Transition>,

	/** Вложенный автомат */
	invoke?: MachineNode,

	/** Автоматический переход в другое состояние после перехода
	 * в текущее через заданный промежуток времени */
	delay?: DelayedTransition,
};
