import type { TERMINAL } from './StateMachineConstants';

export type StateName = string;
export type EventName = string;


// --- Initialization configurations ---

/** Описание перехода в другое состояние */
export type TransitionConfig = {
	after?: number,
	to: StateName,
	do?: Function | Array<Function>
}

/** Описание конечного автомата */
export type MachineConfig = {
	initial: StateName,
	states: { [key: StateName]: StateNodeConfig },
	onDone?: StateName | TransitionConfig,
}

/** Список событий, которые могут инициализировать переход в другое состояние */
export type EventListConfig = {
	[key: EventName]: StateName | TERMINAL | TransitionConfig | MachineConfig
}

/** Описание состояния */
export type StateNodeConfig = {
	on?: EventListConfig,
	delay?: TransitionConfig,
}


// --- State Machine Types ---

/** Описание перехода в другое состояние */
export type Transition = {
	after?: number,
	to: StateNode,
	do?: Function | Array<Function>
}

/** Состояние, звено конечного автомата */
export type StateNode = {
	name: string,
	#parent?: StateNode,
	events?: Map<EventName, Transition>,
	onDone?: Transition,
}