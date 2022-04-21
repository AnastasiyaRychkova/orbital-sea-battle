import Timer, {ITimer} from "../Timer/Timer";
import {
	ActionFunction,
	DelayedTransition,
	EventListConfig,
	IStateNode,
	IStateNodeTesting,
	MachineConfig,
	IStateMachine,
	StateNodeConfig,
	Transition,
	IMachineNodeTesting,
	Context,
} from "./StateMachineTypes";

class StateNode<SState extends string, SEvent extends string> implements IStateNode<SState, SEvent>, IStateNodeTesting
{
	#name: SState;

	#events?: Map<SEvent, Transition<SState>>;

	#delay?: DelayedTransition<SState>;
	#timer?: ITimer;
	#entry?: ActionFunction<SState>;
	#exit?: ActionFunction<SState>;

	#invoke?: IStateMachine<SState, SEvent>;
	#invokeFunc?: () => MachineConfig<SState, SEvent>;
	#parent: IStateMachine<SState, SEvent>;

	constructor(
		name: SState,
		config: StateNodeConfig<SState, SEvent>,
		parent: IStateMachine<SState, SEvent>,
	)
	{
		this.#name = name;
		this.#parent = parent;

		if( config.on )
			this.#events = this._createEventMap( config.on );

		this.#entry = config.entry;
		this.#exit = config.exit;

		if( config.delay && config.delay.after > 0 )
		{
			this.#delay = { ...config.delay };
			this.#timer = Timer.create();
		}

		if( config.invoke )
		{
			this._handleNestedMachineCompletion = this._handleNestedMachineCompletion.bind( this );
			if( typeof config.invoke === 'function' )
				this.#invokeFunc = config.invoke;
			else
				this.#invokeFunc = () => config.invoke as MachineConfig<SState, SEvent>;
		}

	}
	
	/**
	 * Создает хэш-таблицу переходов по событиям из объектов описаний событий
	 * @param listConfig Объект, описывающий события и вызываемые ими переходы между состояниями
	 * @returns Хэш-таблица событий состояния
	 */
	private _createEventMap( listConfig: EventListConfig<SState, SEvent> ): Map<SEvent, Transition<SState>>
	{
		const eventMap = new Map<SEvent, Transition<SState>>();

		for( const [ eventName, eventConfig] of Object.entries( listConfig ) )
		{
			this._addEventTransition(
				eventMap,
				eventName as SEvent,
				eventConfig as Transition<SState> | SState
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
		map: Map<SEvent, Transition<SState>>,
		name: SEvent,
		transition: Transition<SState> | SState
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
	 * Название состояния. Если состояние имеет вложенный автомат, то возвращается название самого глубокого состояния.
	 */
	get name(): SState
	{
		return this.#invoke
					? this.#invoke.state
					: this.#name;
	}

	/** Цепочка текущих состояний вложенных автоматов */
	get statesChain(): SState[]
	{
		const chain = [ this.#name ];
		if( this.#invoke )
			chain.push( ...this.#invoke.statesChain );
		return chain;
	}

	/**
	 * Возвращает объект перехода для событий, объявленных непосредственно внутри состояния
	 * @param event Название события описанного непосредственно внутри состояния
	 */
	transition( event: SEvent ): Transition<SState> | undefined
	{
		return this.#events?.get( event );
	}

	/** Описание отложенного перехода. Если его нет, то возвращается `undefined`. */
	get delayedTransition(): Transition<SState> | undefined
	{
		return this.#delay;
	}

	runNestedDelayedTransitions(): boolean
	{
		if( !this.#invoke )
			return false;
		return this.#invoke.runAllDelayedTransitions();
	}

	/**
	 * Активировать состояние: запустить вложенный автомат и вызвать функцию вхождения
	 */
	start(): void
	{
		this._delayTransition();
		this._callActionFunction( this.#entry );
		this._runNestedMachine();
	}

	/**
	 * Заверить работу: завершить работу вложенного автомата и вызвать функцию выхода
	 * 
	 * 1. __N.Node[exit]
	 * 2. __N.Machine[exit]
	 * 3. Node[exit]
	 * 4. Machine[exit]
	 */
	complete(): void
	{
		this._cancelDelayTransition();
		this._completeNestedMachine();
		this._callActionFunction( this.#exit );
	}

	/**
	 * Инициировать событие во вложенном автомате, если он есть
	 * @param event Событие
	 * @returns Новое состояние конечного автомата (самое глубокое)
	 */
	send( event: SEvent ): boolean
	{
		if( !this.#invoke )
			return false;

		const wasTransition: boolean = this.#invoke.send( event );
		if( wasTransition && this.#invoke.isComplete )
		{
			const onDoneEvent = this.#invoke.onDone;
			if( onDoneEvent )
				this.#parent.send( onDoneEvent );
			this.#invoke = undefined;
		}

		return wasTransition;
	}

	/** Глубина вложенности */
	get depth(): number
	{
		return this.#invoke
				? this.#invoke.depth
				: 0;
	}

	/** Подсчет внутренних состояний */
	get _width(): number
	{
		return this.#invoke !== undefined
				? ( this.#invoke as unknown as IMachineNodeTesting )._width + 1
				: 1;
	}

	get context(): Context | undefined
	{
		return this.#invoke && this.#invoke.deepestContext;
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
				state: this.#name,
				context: this.#parent.context,
				complete: this.#parent.complete,
			} );
		}
		catch( error ) {
			// FIXME: Обработка ошибок из передаваемых в State Machine функций
		}
	}

	/**
	 * Создать и запустить вложенный конечный автомат
	 */
	private _runNestedMachine(): void
	{
		if( !this.#invokeFunc || this.#invoke )
			return;

		this.#invoke = this.#parent.create(
			this.#invokeFunc()
		);
		this.#invoke.once(
			'completed',
			this._handleNestedMachineCompletion,
		);
	}

	private _handleNestedMachineCompletion(): void
	{
		if( !this.#invoke )
			return;
		if( this.#invoke.isComplete )
		{
			if( !this.#parent.isComplete )
			{
				const onDoneEvent = this.#invoke.onDone;
				if( onDoneEvent )
					this.#parent.send( onDoneEvent );
			}
			this.#invoke = undefined;
		}
	}

	private _completeNestedMachine(): void
	{
		if( this.#invoke === undefined )
			return;
		this.#invoke.remove( 'completed', this._handleNestedMachineCompletion );
		this.#invoke.complete();
		this.#invoke = undefined;
	}

	private _delayTransition(): void
	{
		if( this.#delay )
			this.#timer!.start(
				this.#parent.runDelayedTransition,
				this.#delay.after,
				{
					to: this.#delay.to,
					do: this.#delay.do,
				}
			);
	}

	private _cancelDelayTransition(): void
	{
		this.#timer?.stop();
	}
}



export default StateNode;