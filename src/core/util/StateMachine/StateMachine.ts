import StateNode from "./StateNode";

import {
	MachineConfig,
	StateListConfig,
	StateNodeConfig,
	Transition,
	ActionFunction,
	IStateMachine,
	IMachineNodeTesting,
	IStateNodeTesting,
	Context,
	SMEvent,
	SMEventData,
	MachineActionType,
	OnDoneFunction,
} from "./types";
import { EventProvider } from "../EventEmitter";
import type { EventData as EventDataEmitter } from "../EventEmitter/types";

type EventData<StateName> = EventDataEmitter<SMEventData<StateName>>;

/** **Конечный автомат**
 * — это система с конечным, известным количеством состояний,
 * условия переходов между которыми фиксированы и известны,
 * а текущим всегда является ровно одно состояние.
 * 
 * Можно повесить *синхронные* функции на вход и выход конечного автомата
 * и отдельных его состояний, а также на переходы между состояниями.
 */
class StateMachine<SState extends string, SEvent extends string> extends EventProvider<SMEvent, SMEventData<SState>> implements IStateMachine<SState , SEvent >, IMachineNodeTesting
{
	/** Хэш-таблица состояний автомата */
	#states: Map<string, StateNode<SState, SEvent>>;

	/** Объект текущего состояния */
	#current!: StateNode<SState, SEvent>;

	/** Работает ли машина или она уже завершила свое выполнение */
	#completed: boolean;

	/** Название начального состояния */
	#initial: SState;

	/** Название состояния родительского автомата, в которое нужно его перевести после окончания работы текущего */
	#onDone?: SEvent | OnDoneFunction<SState, SEvent>;

	/** Функция, вызываемая при запуске автомата */
	#entry?: ActionFunction<SState>;

	/** Функция, вызываемая по окончании работы автомата */
	#exit?: ActionFunction<SState>;

	/** Контекстный-объект передаваемый в во все состояния */
	#context: Context[];

	/** Является ли конечной автомат вложенным */
	#isRoot: boolean;


	constructor( config: MachineConfig<SState, SEvent>, parent?: StateMachine<SState, SEvent> )
	{
		super();
		this.#completed = false;
		this.#initial = config.initial;
		this.#onDone = config.onDone;
		this.#entry = config.entry;
		this.#exit = config.exit;
		this.#isRoot = parent === undefined;
		
		this.#context = this._createContext( config.context || {}, parent );
		this.runDelayedTransition = this.runDelayedTransition.bind( this );
		this.complete = this.complete.bind( this );
		this.send = this.send.bind( this );
		this.#states = this._createStateMap( config.states );
		this._start();
	}

	/**
	 * Получить объект состояния автомата по названию
	 * @param stateName Название состояния
	 * @returns Объект состояния
	 */
	private _getStateNode( stateName: SState ): StateNode<SState, SEvent>
	{
		const state = this.#states.get( stateName );
		if( state === undefined )
			throw new Error("Invalid state value");
		return state;
	}

	/**
	 * Преобразует объект описаний состояний в хэш-таблицу объектов состояний
	 * @param listConfig Объект, описывающий состояния автомата
	 * @returns Хэш-таблица состояний автомата
	 */
	private _createStateMap( listConfig: StateListConfig<SState, SEvent> ): Map<SState, StateNode<SState, SEvent>>
	{
		const stateMap = new Map<SState, StateNode<SState, SEvent>>();

		for( const [ name, config ] of Object.entries( listConfig ) )
			stateMap.set(
				name as SState,
				this._createStateNode(
					name as SState,
					config as StateNodeConfig<SState, SEvent>,
				)
			);
		
			return stateMap;
	}

	/**
	 * Создает объект состояния
	 * @param stateName Название состояния
	 * @param config Конфигурация
	 * @returns Новый объект состояния
	 */
	private _createStateNode(
		stateName: SState,
		config: StateNodeConfig<SState, SEvent>,
	): StateNode<SState, SEvent>
	{
		return new StateNode( stateName, config, this );
	}


	private _createContext( context: object, parentMachine?: StateMachine<SState, SEvent> ): Context[]
	{
		const machineContext: Context[] = [];
		if( parentMachine )
		{
			machineContext.push( ...parentMachine.context );
		}
		machineContext.push( context );
		return machineContext;
	}


	/**
	 * Перевести автомат в следующее состояние
	 * @param eventTransition Объект-описание перехода
	 */
	private _goToState( eventTransition: Transition<SState> ): void
	{
		const {to: nextState, do: action} = eventTransition;

		this.#current.complete();
		this._changeCurrentState( nextState );
		this._callActionFunction( action );
		this.#current.start();
	}


	/**
	 * Изменить значение текущего состояния
	 * @param state Название нового состояния
	 */
	private _changeCurrentState( state: SState ): void
	{
		this.#current = this._getStateNode( state );
	}

	/**
	 * Инициировать работу конечного автомата
	 * 1. Machine[entry]
	 * 2. Node[entry]
	 * 3. __N.Machine[entry]
	 * 4. __N.Node[entry]
	 */
	private _start(): void
	{
		this._changeCurrentState( this.#initial );

		this._callActionFunction( this.#entry );
		this.#current.start();

		// if( this._hasNestedStateMachine() )
		// 	return ( this.#current!.invoke as StateMachine<SState, SEvent> )._start();
	}

	/**
	 * Вызвать side-effect функцию
	 * @param action Side-effect function
	 */
	private _callActionFunction( action?: ActionFunction<SState> ): void
	{
		if( !action )
			return;

		try {
			action( {
				state: this.state, 
				context: this.#context,
				complete: this.complete,
			} );
		}
		catch( error ) {
			// FIXME: Обработка ошибок из передаваемых в State Machine функций
		}
	}


	/**
	 * Вызвать событие в данном конечном автомате
	 * 
	 * NodeA[exit] -> Transition[do] -> NodeB[entry]
	 * @param event Инициируемое событие
	 * @returns Произошел ли переход. False возвращается, если переданное событие не было описано для текущего состояния конечного автомата.
	 */
	send( event: SEvent ): boolean
	{
		if( this.#completed )
			return false;
		
		const wasTransitionInNestedMachine: boolean = this.#current.send( event );
		if( wasTransitionInNestedMachine )
		{
			this.#isRoot && this._emit( 'changed', { state: this.statesChain } );
			return true;
		}

		const eventTransition = this.#current.transition( event );
		if( !eventTransition ) // если такого события нет
			return false;

		this._goToState( eventTransition );

		this.#isRoot && this._emit( 'changed', { state: this.statesChain } );
		return true;
	}

	/** Есть ли переход по передаваемому событию для текущего состояния */
	hasEvent( event: SEvent ): boolean
	{
		return this.#current.hasEvent( event );
	}

	/** 
	 * Запустить отложенный переход, даже если время еще не истекло
	 * @returns Был ли переход
	 */
	runDelayedTransition(): boolean
	{
		if( this.#completed )
			return false;

		return this._runMachineDelayedTransition();
	}

	private _runMachineDelayedTransition(): boolean
	{
		const transition = this.#current.delayedTransition;
		if( !transition )
			return false;

		this._goToState( transition );
		return true;
	}

	/** Запустить отложенный переход на всех уровнях вложенности */
	runAllDelayedTransitions(): boolean
	{
		if( this.#completed )
			return false;

		const wasDelay = this._runMachineDelayedTransition();
		return wasDelay || this.#current.runNestedDelayedTransitions()
	}

	/** Завершить работу конечного автомата
	 * 
	 * Если автомат является вложенным, то для его родителя он удаляется.
	 * Состояние остается последним на момент вызова функции.
	 * 
	 * По завершении работы вызывается
	 * `StateNode[exit] `--> `Machine[exit]`
	 */
	complete(): void
	{
		if( this.#completed )
			return;

		this.#current.complete();
		this._callActionFunction( this.#exit );

		this._emit( 'completed', { state: this.statesChain } );
		this.#completed = true;
	}

	/** 
	 * Создать вложенную машину с теми же типами состояний и событий
	 */
	create(config: MachineConfig<SState, SEvent>): IStateMachine<SState, SEvent>
	{
		return new StateMachine<SState, SEvent>( config, this );
	}

	/**
	 * Название текущего состояния
	 */
	get state(): SState
	{
		return this.#current.name;
	}

	/** Завершена ли работа конечного автомата */
	get isCompleted(): boolean
	{
		return this.#completed;
	}

	/** Объект, передаваемый во все функции */
	get context(): Context[]
	{
		return this.#context;
	}

	get deepestContext(): Context
	{
		return this.#current.context || this.#context[ this.#context.length - 1 ];
	}

	/** Глубина вложенности */
	get depth(): number
	{
		return this.#current.depth + 1;
	}

	/** Название события текущего состояния родительского автомата, 
	 * которое будет инициировано, когда текущий вложенный автомат 
	 * закончит свою работу */
	get onDone(): SEvent | undefined
	{
		return typeof this.#onDone === 'function'
					? this.#onDone( {
						state: this.state,
						context: this.#context,
					} )
					: this.#onDone;
	}

	/** Цепочка текущих состояний вложенных автоматов */
	get statesChain(): SState[]
	{
		return this.#completed
				? []
				: this.#current.statesChain;
	}

	get _width(): number
	{
		let statesCount: number = 0;
		this.#states.forEach( ( state ) => {
			statesCount += (state as unknown as IStateNodeTesting)._width;
		} );

		return statesCount;
	}
}

export default StateMachine;

export type {
	IStateMachine,
	MachineActionType,
	Context,
	EventData,
}