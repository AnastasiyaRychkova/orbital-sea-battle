import IEventProvider from "../EventEmitter/EventProviderInterface";
import ITimer from "../Timer/TimerInterface";

type Seconds = number;

export type TerminalStr = '__END__';
export const TERMINAL = '__END__'

/** Название состояния */
// export type StateName = string;

/** Название события */
// export type EventName = string;



/*=============================================
=             State Machine Types             =
=============================================*/

export type Context = {
	parent?: Context,
} & any;

export type OnDoneDataType<StateName extends string> = {
	state: StateName,
	context: Context,
};

export type MachineActionType<StateName extends string> = {
	complete: () => void,
} & OnDoneDataType<StateName>;

export type SMEvent = 'changed' | 'completed';
export type SMEventData<StateName> = {
	state: StateName[],
} 


/** Конечный автомат */
export interface IStateMachine<StateName extends string, EventName extends string> extends IEventProvider<SMEvent, SMEventData<StateName>> {
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
	send: ( event: EventName ) => boolean;

	/** Завершить работу конечного автомата */
	complete: () => void;

	/** Запустить отложенный переход, даже если время еще не истекло */
	runDelayedTransition(): boolean;

	/** Запустить отложенный переход на всех уровнях вложенности */
	runAllDelayedTransitions(): boolean;

	/** Завершена ли работа конечного автомата */
	isComplete: boolean;

	/** Текущее состояние */
	state: StateName;

	/** Цепочка текущих состояний вложенных автоматов */
	statesChain: StateName[];

	/** Объект контекста */
	context: Context;

	/** Глубина вложенности */
	depth: number;

	/** Название события текущего состояния родительского автомата, 
	 * которое будет инициировано, когда текущий вложенный автомат 
	 * закончит свою работу */
	onDone?: EventName;

	/** Создать вложенную машину с теми же типами состояний и событий */
	create: ( config: MachineConfig<StateName, EventName> ) => IStateMachine<StateName, EventName>;
};


/** Side-effect function
 * @param state Текущее состояние автомата
 * @param context Контекст-объект текущего конечного автомата
 */
export type ActionFunction<StateName extends string> = ( machine: MachineActionType<StateName> ) => void;

export type OnDoneFunction<StateName extends string, EventName extends string> = ( machine: OnDoneDataType<StateName> ) => EventName;


/** Описание перехода в другое состояние */
export type Transition<StateName extends string> = {
	/** Конечное состояние */
	to: StateName,

	/** Side-effect function
	 * 
	 * *Вызывается после перехода*
	 */
	do?: ActionFunction<StateName>
};


export interface IMachineNodeTesting
{
	/** Количество внутренних состояний */
	_width: number;
}


/** 
 * Состояние — звено конечного автомата
 */
export interface IStateNode<StateName extends string, EventName extends string>
{
	/**
	 * Название состояния. Если состояние имеет вложенный автомат, то возвращается название самого глубокого состояния.
	 */
	name: StateName;

	/**
	 * Возвращает объект перехода для событий, объявленных непосредственно внутри состояния
	 * @param event Название события описанного непосредственно внутри состояния
	 */
	transition( event: EventName ): Transition<StateName> | undefined;

	/** Описание отложенного перехода */
	delayedTransition: Transition<StateName> | undefined;

	/**
	 * Активировать состояние: запустить вложенный автомат и вызвать функцию вхождения
	 */
	start(): void;

	/**
	 * Заверить работу: завершить работу вложенного автомата и вызвать функцию выхода
	 */
	complete(): void;

	/**
	 * Инициировать событие во вложенном автомате, если он есть
	 * @param event Событие
	 * @returns Новое состояние конечного автомата (самое глубокое)
	 */
	send( event: EventName ): boolean;

	/** Глубина вложенности */
	depth: number;

	/** Цепочка текущих состояний вложенных автоматов */
	statesChain: StateName[];

	/** События, которые могут быть инициированы в данном состоянии */
	//events?: Map<EventName, Transition<StateName>>,

	/** Вложенный автомат */
	// invoke?: MachineNode<StateName, EventName>,

	/** Автоматический переход в другое состояние после перехода
	 * в текущее через заданный промежуток времени */
	//delay?: DelayedTransition<StateName>,

	/** Функция, которая всегда вызывается после перехода в данное состояние.
	 * 
	 * `StateNode[entry]` --> `Transition[do]` --> `Machine[entry]`
	 */
	// #entry?: ActionFunction<StateName>,

	/** Функция, которая всегда вызывается после перехода из данного состояние.
	 * 
	 * `StateNode[exit]` --> `Event: Transition[do]` --> `Machine[exit]`
	 */
	// #exit?: ActionFunction<StateName>,
};

export interface IStateNodeTesting
{
	/** Количество внутренних состояний */
	_width: number;
}





/*=============================================
=        Initialization configurations        =
=============================================*/



/** Описание отложенного перехода в другое состояние */
export type DelayedTransition<StateName extends string> = {
	/** Временной промежуток в секундах */
	after: Seconds
} & Transition<StateName>;


/** Описание состояний конечного автомата */
export type StateListConfig<StateName extends string, EventName extends string> = {
	[key in StateName]?: StateNodeConfig<StateName, EventName>;
};

/** Описание конечного автомата. Объект для инициализации */
export type MachineConfig<StateName extends string, EventName extends string> = {
	/** Название начального состояния */
	initial: StateName,

	/** Состояния автомата */
	states: StateListConfig<StateName, EventName>,

	/** Название события текущего состояния родительского автомата, 
	 * которое будет инициировано, когда текущий вложенный автомат 
	 * закончит свою работу */
	onDone?: EventName | OnDoneFunction<StateName, EventName>,

	/** Функция, вызываемая при запуске автомата */
	entry?: ActionFunction<StateName>,

	/** Функция, вызываемая по окончании работы автомата */
	exit?: ActionFunction<StateName>,

	/** Контекстный-объект передаваемый в во все  */
	context?: object,
};

/** Список событий, которые могут инициализировать переход в другое состояние */
export type EventListConfig<StateName extends string, EventName extends string> = {
	[key in EventName]?: StateName | Transition<StateName>;
};

/** Описание состояния */
export type StateNodeConfig<StateName extends string, EventName extends string> = {
	/** Вложенный автомат, который запуститься с начала после перехода в текущее состояние */
	invoke?: MachineConfig<StateName, EventName> | (() => MachineConfig<StateName, EventName>),

	/** События, которые могут инициировать переход в другое состояние */
	on?: EventListConfig<StateName, EventName>,

	/** Автоматический переход в другое состояние после перехода в текущее 
	 * через заданный промежуток времени */
	delay?: DelayedTransition<StateName>,

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


