import {
	EventName,
	StateName,
	MachineConfig,
	ActionFunction,
	StateNodeConfig,
	EventListConfig,
	StateListConfig,
	StateNode,
	Transition,
} from "./StateMachineTypes";

/** **Конечный автомат**
 * — это система с конечным, известным количеством состояний,
 * условия переходов между которыми фиксированы и известны,
 * а текущим всегда является ровно одно состояние.
 */
class StateMachine
{
	/** Хэш-таблица состояний автомата */
	#states: Map<StateName, StateNode>;

	/** Объект текущего состояния */
	#current!: StateNode;

	/** Название начального состояния */
	#initial: StateName;

	/** Родительский автомат */
	#parent?: StateMachine;

	/** Название состояния родительского автомата, в которое нужно его перевести после окончания работы текущего */
	#onDone?: EventName;

	/** Функция, вызываемая при запуске автомата */
	#entry?: ActionFunction;

	/** Функция, вызываемая по окончании работы автомата */
	#exit?: ActionFunction;

	/** Контекстный-объект передаваемый в во все  */
	#context?: object;

	/** Название состояние, означающее окончание работы автомата */
	static readonly TERMINAL: StateName = '__END__';

	constructor( config: MachineConfig, parent?: StateMachine )
	{
		this.#initial = config.initial;
		this.#onDone = config.onDone;
		this.#entry = config.entry;
		this.#exit = config.exit;
		this.#context = config.context;
		this.#parent = parent;

		this.#states = StateMachine._createStateMap( config.states );
		this._start();
	}

	/**
	 * Получить объект состояния автомата по названию
	 * @param stateName Название состояния
	 * @returns Объект состояния
	 */
	private _getStateNode( stateName: StateName ): StateNode
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
	private static _createStateMap( listConfig: StateListConfig ): Map<string, StateNode>
	{
		const stateMap = new Map<string, StateNode>();

		for (const [ name, config ] of Object.entries( listConfig ))
			stateMap.set( 
				name,
				StateMachine._createStateNode(
					name,
					config as StateNodeConfig,
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
	private static _createStateNode(
		stateName: StateName,
		config: StateNodeConfig,
	): StateNode
	{
		const state: StateNode = {
			value: stateName,
		};

		if( config.on )
			state.events = StateMachine._createEventMap( config.on );
		
		if( config.invoke )
			state.invoke = new StateMachine( config.invoke );

		if( config.delay )
			state.delay = {
				timeoutId: -1,
				...config.delay,
			}
		
		return state;
	}

	/**
	 * Создает хэш-таблицу переходов по событиям из объектов описаний событий
	 * @param listConfig Объект, описывающий события и вызываемые ими переходы между состояниями
	 * @returns Хэш-таблица событий состояния
	 */
	private static _createEventMap( listConfig: EventListConfig ): Map<EventName, Transition>
	{
		const eventMap = new Map<EventName, Transition>();

		for (const [ eventName, eventConfig] of Object.entries( listConfig ) )
		{
			StateMachine._addEventTransition(eventMap, eventName, eventConfig as Transition);
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
	private static _addEventTransition(
		map: Map<string, Transition>,
		name: EventName,
		transition: Transition
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
	private _goToState( eventTransition: Transition ): StateName
	{
		const {to: nextState, do: action} = eventTransition;
		this._stopTimer();

		if( this._isFinishing( nextState ) )
			return this._end( eventTransition );

		this._changeCurrentState( nextState );
		this._callActionFunction( action );
		this._startTimer();

		if( this._hasNestedStateMachine() )
			return ( this.#current.invoke as StateMachine )._start();
		
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
	private _isFinishing( nextState: StateName ): boolean
	{
		return nextState === StateMachine.TERMINAL;
	}

	/**
	 * Изменить значение текущего состояния
	 * @param state Название нового состояния
	 */
	private _changeCurrentState( state: StateName ): void
	{
		this.#current = this._getStateNode( state );
	}

	/**
	 * Инициировать работу конечного автомата
	 * @returns Название инициированного состояния
	 */
	private _start(): StateName
	{
		this._changeCurrentState( this.#initial );
		this._callActionFunction( this.#entry );
		this._startTimer();

		if( this._hasNestedStateMachine() )
			return ( this.#current.invoke as StateMachine )._start();
		return this.value;
	}

	/**
	 * Завершить работу конечного автомата
	 * @param eventTransition Завершающий переход
	 * @returns Название состояния родительского автомата, в которое он перейдет после завершения работы текущего
	 */
	private _end( eventTransition: Transition ): StateName
	{
		this._callActionFunction( eventTransition.do );
		this._callActionFunction( this.#exit );

		return this.#parent ? (this.#parent as StateMachine)._goToState({ to: this.#onDone || StateMachine.TERMINAL }) : StateMachine.TERMINAL;
	}

	/**
	 * Вызвать side-effect функцию
	 * @param action Side-effect function
	 */
	private _callActionFunction( action: ActionFunction|undefined ): void
	{
		action && action( this.value, this.#context);
	}

	/**
	 * Запустить таймер отложенного перехода
	 */
	private _startTimer(): void
	{
		if( this.#current.delay
			&& this.#current.delay.after > 0
		)
			this.#current.delay.timeoutId = window.setTimeout(
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
			window.clearTimeout( this.#current.delay.timeoutId );
			this.#current.delay.timeoutId = -1;
		}

		if( this._hasNestedStateMachine() )
			(this.#current.invoke as StateMachine)._stopTimer();
	}

	/**
	 * Вызвать событие в данном конечном автомате
	 * @param event Инициируемое событие
	 * @returns Состояние, в которое перейдет конечный автомат
	 */
	send( event: EventName ): StateName
	{
		if( this._hasNestedStateMachine() )
			return (this.#current.invoke as StateMachine ).send( event );
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
	private _getEventTransition( event: EventName ): Transition | undefined
	{
		return this.#current.events?.get(event);
	}

	/**
	 * Название текущего состояния
	 */
	get value(): StateName
	{
		return this.#current.value;
	}
	
}

export {
	StateMachine,
}
