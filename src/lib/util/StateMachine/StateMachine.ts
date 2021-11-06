import Timer from "../Timer/Timer";
import {
	MachineConfig,
	StateListConfig,
	StateNodeConfig,
	StateNode,
	EventListConfig,
	Transition,
	ActionFunction,
	TerminalStr,
	TERMINAL,
} from "./StateMachineTypes";

/** **Конечный автомат**
 * — это система с конечным, известным количеством состояний,
 * условия переходов между которыми фиксированы и известны,
 * а текущим всегда является ровно одно состояние.
 * SM_State = State | TerminalStr
 */
class StateMachine<State extends string, Event extends string>
{
	/** Хэш-таблица состояний автомата */
	#states: Map<State, StateNode<State, Event>>;

	/** Объект текущего состояния */
	#current!: StateNode<State, Event>;

	/** Название начального состояния */
	#initial: State;

	/** Родительский автомат */
	#parent?: StateMachine<State, Event>;

	/** Название состояния родительского автомата, в которое нужно его перевести после окончания работы текущего */
	#onDone?: State | TerminalStr;

	/** Функция, вызываемая при запуске автомата */
	#entry?: ActionFunction<State>;

	/** Функция, вызываемая по окончании работы автомата */
	#exit?: ActionFunction<State>;

	/** Контекстный-объект передаваемый в во все  */
	#context?: object;


	constructor( config: MachineConfig<State, Event>, parent?: StateMachine<State, Event> )
	{
		this.#initial = config.initial;
		this.#onDone = config.onDone;
		this.#entry = config.entry;
		this.#exit = config.exit;
		this.#context = config.context;
		this.#parent = parent;

		this._goToState = this._goToState.bind( this );
		this.#states = this._createStateMap( config.states );
		this._start();
	}

	/**
	 * Получить объект состояния автомата по названию
	 * @param stateName Название состояния
	 * @returns Объект состояния
	 */
	private _getStateNode( stateName: State ): StateNode<State, Event>
	{
		const state = this.#states.get( stateName );
		if (state === undefined)
			throw new Error("Invalid state value");
		return state;
	}

	/**
	 * Преобразует объект описаний состояний в хэш-таблицу объектов состояний
	 * @param listConfig Объект, описывающий состояния автомата
	 * @returns Хэш-таблица состояний автомата
	 */
	private _createStateMap( listConfig: StateListConfig<State, Event> ): Map<State, StateNode<State, Event>>
	{
		const stateMap = new Map<State, StateNode<State, Event>>();

		for (const [ name, config ] of Object.entries( listConfig ))
			stateMap.set(
				name as State,
				this._createStateNode(
					name as State,
					config as StateNodeConfig<State, Event>,
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
		stateName: State,
		config: StateNodeConfig<State, Event>,
	): StateNode<State, Event>
	{
		const state: StateNode<State, Event> = {
			value: stateName,
		};

		if( config.on )
			state.events = this._createEventMap( config.on );
		
		if( config.invoke )
			state.invoke = new StateMachine( config.invoke );

		if( config.delay )
			state.delay = {
				timeout: new Timer(),
				...config.delay,
			}
		state.entry = config.entry;
		state.exit = config.exit;
		
		return state;
	}

	/**
	 * Создает хэш-таблицу переходов по событиям из объектов описаний событий
	 * @param listConfig Объект, описывающий события и вызываемые ими переходы между состояниями
	 * @returns Хэш-таблица событий состояния
	 */
	private _createEventMap( listConfig: EventListConfig<State, Event> ): Map<Event, Transition<State|TerminalStr>>
	{
		const eventMap = new Map<Event, Transition<State|TerminalStr>>();

		for (const [ eventName, eventConfig] of Object.entries( listConfig ) )
		{
			this._addEventTransition(
				eventMap,
				eventName as Event,
				eventConfig as Transition<State|TerminalStr>|TerminalStr|State
			);
		}

		return eventMap;
	}

	/**
	 * Создает и добавляет в хэш-таблицу событие (ключ)
	 * и вызванный им переход (значение).
	 * 
	 * *Свойства объекта `transition` копируются в добавляемый объект*
	 * @param map Хэш-таблица событий состояния
	 * @param name Название события
	 * @param transition Переход, вызванный событием
	 */
	private _addEventTransition(
		map: Map<Event, Transition<State|TerminalStr>>,
		name: Event,
		transition: Transition<State|TerminalStr>|TerminalStr|State
	): void
	{
		map.set(
			name,
			typeof transition === 'string' ?
				{ to: transition }
				: { ...transition }
		);
	}


	/**
	 * Перевести автомат в следующее состояние
	 * @param eventTransition Объект-описание перехода
	 * @returns Название состояние, в которое перейдет данный автомат
	 */
	private _goToState( eventTransition: Transition<State|TerminalStr> ): State|TerminalStr
	{
		const {to: nextState, do: action} = eventTransition;
		this._stopTimer();

		if( this._isFinishing( nextState ) )
			return this._end( eventTransition );

		this._callActionFunction( this.#current.exit );
		
		this._changeCurrentState( nextState as State );

		this._callActionFunction( this.#current.entry );
		this._callActionFunction( action );
		
		this._startTimer();

		if( this._hasNestedStateMachine() )
			return ( this.#current.invoke as StateMachine<State, Event> )._start();
		
		return this.value;
	}

	/**
	 * Имеет ли текущее состояние вложенный автомат?
	 */
	private _hasNestedStateMachine(): boolean
	{
		return this.#current.invoke !== undefined;
	}

	/**
	 * Должен ли автомат завершить свою работу?
	 * @param nextState Состояние, в которое должен перейти автомат
	 */
	private _isFinishing( nextState: State|TerminalStr ): boolean
	{
		return nextState === TERMINAL;
	}
 
	/**
	 * Изменить значение текущего состояния
	 * @param state Название нового состояния
	 */
	private _changeCurrentState( state: State ): void
	{
		this.#current = this._getStateNode( state );
	}

	/**
	 * Инициировать работу конечного автомата
	 * @returns Название инициированного состояния
	 */
	private _start(): State
	{
		this._changeCurrentState( this.#initial );
		this._callActionFunction( this.#current.entry );
		this._callActionFunction( this.#entry );
		this._startTimer();

		if( this._hasNestedStateMachine() )
			return ( this.#current.invoke as StateMachine<State, Event> )._start();
		return this.value;
	}

	/**
	 * Завершить работу конечного автомата
	 * @param eventTransition Завершающий переход
	 * @returns Название состояния родительского автомата, в которое он перейдет после завершения работы текущего
	 */
	private _end( eventTransition: Transition<State|TerminalStr> ): State | TerminalStr
	{
		this._callActionFunction( this.#current.exit );
		this._callActionFunction( eventTransition.do );
		this._callActionFunction( this.#exit );

		return this.#parent ? (this.#parent as StateMachine<State, Event>)._goToState({ to: this.#onDone || TERMINAL }) : TERMINAL;
	}

	/**
	 * Вызвать side-effect функцию
	 * @param action Side-effect function
	 */
	private async _callActionFunction( action: ActionFunction<State>|undefined ): Promise<void>
	{
		if( action )
		{
			const promise = async () => {
				return action( this.value, this.#context);
			}

			try {
				await promise();
			}
			catch( error ) {
				
			}
		}
	}

	/**
	 * Запустить таймер отложенного перехода
	 */
	private _startTimer(): void
	{
		if( this.#current.delay
			&& this.#current.delay.after > 0
		)
			this.#current.delay.timeout.start(
				this._goToState,
				this.#current.delay.after,
				{
					to: this.#current.delay.to,
					do: this.#current.delay.do
				}
			);
	}

	/**
	 * Остановить таймер отложенного перехода
	 */
	private _stopTimer(): void
	{
		if( this.#current.delay )
		{
			this.#current.delay.timeout.stop();
		}

		if( this._hasNestedStateMachine() )
			(this.#current.invoke as StateMachine<State, Event>)._stopTimer();
	}

	/**
	 * Вызвать событие в данном конечном автомате
	 * @param event Инициируемое событие
	 * @returns Состояние, в которое перейдет конечный автомат
	 */
	send( event: Event ): State|TerminalStr
	{
		if( this._hasNestedStateMachine() )
			return (this.#current.invoke as StateMachine<State, Event> ).send( event );
		// если такого события нет
		const eventTransition = this._getEventTransition( event );
		if( eventTransition === undefined )
			return this.value;

		return this._goToState( eventTransition );
	}

	/**
	 * Получить объект перехода по названию события
	 * @param event Название события
	 * @returns Объект перехода
	 */
	private _getEventTransition( event: Event ): Transition<State|TerminalStr> | undefined
	{
		return this.#current.events?.get(event);
	}

	/**
	 * Название текущего состояния
	 */
	get value(): State
	{
		return this.#current.value;
	}
	
}

export {
	StateMachine,
}
