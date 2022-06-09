import { IStopwatch, randomBool, stopwatch } from '../../../util/util';
import EventProvider, { IEventProvider, ListenerFunc } from "../../../util/EventEmitter/EventProvider";
import StateMachine, { IStateMachine, MachineActionType } from "../../../util/StateMachine/StateMachine";
import OB_IGameState, { GSEvent, GSEventData, GSResults } from "../interfaces/OB_GameStateInterface";

import type { ActionFunction, Context } from "../../../util/StateMachine/StateMachineTypes";
import type { OB_IEnemy, OB_ILocalPlayer, OB_IPlayer, IUser } from "../OB_Entities";
import type {
	EventContext,
	NamingContext,
	SelectingContext,
	ShootingContext,
	SState,
	RootContext,
	GameScore,
	PlayersFabric,
} from "../types";

type SEvent = string;

type Milliseconds = number;



class GameState extends EventProvider<GSEvent, GSEventData> implements OB_IGameState
{
	#machine: IStateMachine<SState, string>;

	#entitiesFabric: PlayersFabric;

	#player: OB_ILocalPlayer;
	#enemy: OB_IEnemy;
	#winner?: OB_IPlayer;
	#timeCounter: IStopwatch;

	#history: GSResults[];


	readonly #DIAGRAM_CHECKING_TIMEOUT = 1000;


	constructor( player: IUser, enemy: IUser, fabric: PlayersFabric )
	{
		super();
		this.#entitiesFabric = fabric;
		this.#player = fabric.player( player );
		this.#enemy = fabric.enemy( enemy );
		this.#timeCounter = stopwatch();
		this.#machine = this._initStateMachine();
		this.#history = [];

		this.#player.setDiagram( fabric.diagram() );
		this.#enemy.setDiagram( fabric.diagram() );

		this.send = this.send.bind( this );

		this.#timeCounter.start();
	}

	get player(): OB_ILocalPlayer
	{
		return this.#player;
	}

	get enemy(): OB_IEnemy
	{
		return this.#enemy;
	}

	get winner(): OB_IPlayer | undefined
	{
		return this.#winner;
	}

	get result(): GSResults | undefined
	{
		return this.#machine.statesChain[0] === 'results' && this.#history.length > 0
				? this.#history[ this.#history.length - 1 ]
				: undefined;
	}

	get score(): GameScore
	{
		const score = {
			player: 0,
			enemy: 0,
		};

		this.#history.forEach( ( match ) => {
			if( match.isLocalPlayerWinner )
				score.player++;
			else
				score.enemy++;
		} );

		return score;
	}

	/**
	 * Инициировать событие в игре
	 * @param event Событие
	 * @param context Передаваемые данные для события
	 */
	send( event: string, context?: EventContext ): void
	{
		if( context )
			this._setEventContext( context );
		this.#machine.send( event );
	}

	/**
	 * Добавить в контекст автомата состояния игры контекст вызываемого события
	 * @param context Контекст события
	 */
	private _setEventContext( context: object ): void
	{
		const root = this.#machine.context[0] as RootContext;
		root.detail = context;
/* 		const deepestContext = this.#machine.deepestContext as any;
		for( const [key, value] of Object.entries( context ) )
		{
			deepestContext[ key ] = value;
		} */
	}

	/** Состояние игры — `string` */
	get state(): SState
	{
		return this.#machine.state;
	}

	get statesChain(): SState[]
	{
		return this.#machine.statesChain;
	}

	on( event: GSEvent, listener: ListenerFunc<GSEventData> ): IEventProvider<GSEvent, GSEventData>
	{
		if( event === 'change' )
			this.#machine.on( 'changed', listener );
		else
			super.on( event, listener );
		return this;
	}

	once( event: GSEvent, listener: ListenerFunc<GSEventData> ): IEventProvider<GSEvent, GSEventData>
	{
		if( event === 'change' )
			this.#machine.once( 'changed', listener );
		else
			super.once( event, listener );
		return this;
	}

	remove( event: GSEvent, listener: ListenerFunc<GSEventData> ): IEventProvider<GSEvent, GSEventData>
	{
		if( event === 'change' )
			this.#machine.remove( 'changed', listener );
		else
			super.remove( event, listener );
		return this;
	}

	/**
	 * Закончилась лл игра
	 */
	get isOver(): boolean
	{
		return this.#winner !== undefined;
	}

	/**
	 * Контекст самого глубоко вложенного конечного автомата
	 * @param contexts Массив контекстов вложенных конечных автоматов
	 * @returns Последний элемент массива
	 */
	private _eventContext( contexts: Context[] ): EventContext
	{
		return (contexts[0] as RootContext).detail;
		// return contexts[ contexts.length - 1 ];
	}

	private _sendInNextTick( event: SEvent )
	{
		setTimeout( this.#machine.send, 0, event );
	}

	/**
	 * Функция-замыкание, которая вызовет событие на автомате через заданное время
	 * @param event Передаваемое в конечный автомат событие
	 * @param delay Задержка в миллисекундах
	 * @returns Функцию-замыкание с сохраненными параметрами
	 */
	private _delaySendingEvent( event: SEvent, delay: Milliseconds ): () => void
	{
		return () => {
			setTimeout( () => this.#machine.send( event ), delay );
		}
	}

	/**
	 * Отметить, что onboarding был пройден
	 * @param prop Свойство объекта контекста, отвечающее за отметку о прохождении onboarding
	 * @returns Функция-замыкание, которая изменит переданное свойство контекста на `true`
	 */
	private _markOnboardingComplete( prop: keyof RootContext ): ActionFunction<SState>
	{
		return ( machine: MachineActionType<SState> ) => {
			(machine.context[0] as RootContext)[ prop ] = true;
		};
	}

	/**
	 * Функция-замыкание, которая переходит к следующему после onboarding состоянию
	 * @param prop Свойство объекта контекста, отвечающее за отметку о прохождении onboarding
	 * @returns Функция-замыкание, которая отправляет в систему событие `start`, которое должно быть определено во всех состояниях `instruction`
	 */
	private _skipOnboarding( prop: keyof RootContext ): ActionFunction<SState>
	{
		return ( machine: MachineActionType<SState> ) => {
			if( (machine.context[0] as RootContext)[ prop ] )
				this._sendInNextTick( 'start' );
		};
	}

	/**
	 * preparing.selecting --(select)--> preparing.filling
	 */
	private _selectingHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as SelectingContext;
		const elemNumber = context.elemNumber;
		if( !elemNumber )
			throw new Error("Selected element is not defined");

		this.#player.selectElement( elemNumber );
	}

	/**
	 * preparing.selecting --(select)--> preparing.filling
	 */
	private _reselectingHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as SelectingContext;
		const elemNumber = context.elemNumber;
		if( !elemNumber )
			throw new Error("Selected element is not defined");

		this.#player.selectElement( elemNumber );
		this.#player.diagram?.reset();
	}

	/**
	 * Ожидание соперника, пока тот заполнит диаграмму
	 */
	private _waitingForEnemyDiagramFillingHander: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		if( !this.#enemy.hasFilled )
			this.#enemy.once( 'filling', this._startShooting );
		else
			setTimeout( this._startShooting );
	}

	private _startShooting = () => {
		this.#machine.send( 'play' );
	}

	/**
	 * Определение того, кто ходит первым и начло игры
	 * shooting.match_start --(match_start.player_turn)-->shooting.moving
	 * shooting.match_start --( match_start.enemy_turn)-->shooting.enemy_waiting
	 */
	private _matchStartHandler: ActionFunction<SState> = () => {
		this.#machine.send( randomBool() ? 'player_turn' : 'enemy_turn' );
	}

	/**
	 * moving --(player_shot)--> result_waiting
	 */
	private _playerShotHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as ShootingContext;
		const cell = context.shot;
		if( !cell )
			throw new Error("Enemy shot cell is not defined");

		this.#enemy.markEnemyShot( cell )
			.then( ( result: boolean ) => {
				this.#player.markShotResult( cell, result );
				this._sendInNextTick( 'player_shot' );
			} );
	}

	private _playerNamingHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as SelectingContext;
		const elemNumber = context.elemNumber;
		if( !elemNumber )
			throw new Error("Selected element is not defined");

		this.#enemy.isThisElementSelected( elemNumber )
			.then( ( result: boolean ) => {
				this._finishGameWithWinner( result ? this.#player : this.#enemy );
				this.#machine.send( 'player_name' );
			} );
	}

	/**
	 * enemy_waiting --(enemy_shot)--> moving
	 */
	private _enemyShotHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as ShootingContext;
		const cell = context.shot;
		if( !cell )
			throw new Error("Enemy shot cell is not defined");

		const result = this.#player.markEnemyShot( cell );
		this.#enemy.markShotResult( cell, result );
	}

	/**
	 * enemy_waiting --(enemy_name)--> end
	 */
	private _enemyNamingHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as NamingContext;
		const elem = context.namedElemNumber;
		if( !elem )
			throw new Error("Enemy naming element number is not defined");

		this._finishGameWithWinner( this.#player.isThisElementSelected( elem ) ? this.#enemy : this.#player )
	}

	/**
	 * ->* final
	 */
	private _sumUpGameResults: ActionFunction<SState> = () => {
		if( !this.isOver )
			this._finishGameWithWinner( this.#enemy );
		
		const result: GSResults = {
			isLocalPlayerWinner: this.#winner === this.#player,
			player: this.#player.getResults()!,
			enemy: this.#enemy.getResults()!,
			duration: this.#timeCounter.value,
		};

		this.#history.push( result );
		this._emit( 'finish', result );
	}

	private _requestingRematch: ActionFunction<SState> = () => {
		this.#enemy.requestRematch().then( ( answer: boolean ) => {
			this.#machine.send( answer ? 'rematch' : 'reject' );
		} )
	}

	private _rematchHandler: ActionFunction<SState> = () => {
		this.#player = this.#entitiesFabric.player( this.#player.user );
		this.#player.setDiagram( this.#entitiesFabric.diagram() );
		this.#enemy = this.#entitiesFabric.enemy( this.#enemy.user );
		this.#enemy.setDiagram( this.#entitiesFabric.diagram() );
		this.#winner = undefined;
		this.#timeCounter.reset()
						.start()
		this._emit( 'new' );
	}


	/**
	 * Номинально завершить игру для обоих игроков и матча
	 * @param winner Победитель
	 */
	private _finishGameWithWinner( winner: OB_IPlayer ): void
	{
		this.#timeCounter.stop();
		this.#winner = winner;
		this.#enemy.finishGame();
		this.#player.finishGame();

		this.#enemy.remove( 'filling', this._startShooting );
	}


	private _initStateMachine(): IStateMachine<SState, string>
	{
		const completeFunc = ( machine: MachineActionType<SState> ) => {
			machine.complete();
		};

		return new StateMachine<SState, SEvent>( {
			initial: 'preparing',
			context: {
				detail: {},
				selectionInstruction: false,
				diagramInstruction: false,
				shootingInstruction: false,
			},
			states: {
				preparing: {
					on: {
						ready: 'waiting',
						give_in: 'results',
					},
					invoke: {
						initial: 'selecting',
						states: {
							selecting: {
								on: {
									select: { to: 'filling', do: this._selectingHandler },
									reselect: { to: 'filling', do: this._reselectingHandler },
									back: 'filling',
								},
								invoke: {
									initial: 'instruction',
									states: {
										instruction: {
											entry: this._skipOnboarding( 'selectionInstruction' ),
											on: {
												start: {
													to: 'choice',
													do: this._markOnboardingComplete( 'selectionInstruction' ),
												},
											},
										},
										choice: {
											on: {
												invalid: 'choice',
											}
										},
									},
								},
							},
							filling: {
								on: {
									change: 'selecting',
								},
								invoke: {
									initial: 'instruction',
									states: {
										instruction: {
											entry: this._skipOnboarding( 'diagramInstruction' ),
											on: {
												start: {
													to: 'diagram',
													do: this._markOnboardingComplete( 'diagramInstruction' ),
												},
											},
										},
										diagram: {
											on: {
												correct: 'correct',
												fail: 'fail',
											},
										},
										correct: {
											entry: this._delaySendingEvent( 'ready', this.#DIAGRAM_CHECKING_TIMEOUT ),
										},
										fail: {
											entry: this._delaySendingEvent( 'continue', this.#DIAGRAM_CHECKING_TIMEOUT ),
											on: {
												continue: 'diagram',
											}
										},
									},
								},
							},
						},
					},
				},
				waiting: {
					entry: this._waitingForEnemyDiagramFillingHander,
					on: {
						play: 'shooting',
						give_in: 'results',
					}
				},
				shooting: {
					on: {
						complete: 'results',
						give_in: 'results',
					},
					invoke: {
						initial: 'instruction',
						states: {
							instruction: {
								entry: this._skipOnboarding( 'shootingInstruction' ),
								on: {
									start: {
										to: 'match_start',
										do: this._markOnboardingComplete( 'shootingInstruction' ),
									},
								},
							},
							match_start: {
								entry: this._matchStartHandler,
								on: {
									player_turn: 'moving',
									enemy_turn: 'enemy_waiting',
								}
							},
							moving: {
								on: {
									player_shot: {
										to: 'result_waiting',
										do: this._playerShotHandler
									},
									player_name: {
										to: 'result_waiting',
										do: this._playerNamingHandler,
									},
								},
							},
							enemy_waiting: {
								on: {
									enemy_shot: {
										to: 'moving',
										do: this._enemyShotHandler
									},
									enemy_name: {
										to: 'end',
										do: this._enemyNamingHandler
									},
								}
							},
							result_waiting: {
								on: {
									player_shot: 'enemy_waiting',
									player_name: 'end',
								},
							},
							end: {
								entry: completeFunc,
							},
						},
						onDone: 'complete',
					},
				},
				results: {
					on: {
						exit: 'game_over',
						rematch: {
							to: 'preparing',
							do: this._rematchHandler,
						},
					},
					invoke: {
						initial: 'final',
						entry: this._sumUpGameResults,
						states: {
							final: {
								on: {
									send_request: 'request',
									get_request: 'response',
								},
							},
							request: {
								entry: this._requestingRematch,
								on: {
									reject: 'final',
								},
							},
							response: {
								on: {
									reject: 'final',
								},
							},
						},
					},
				},
				game_over: {
					entry: completeFunc,
				}
			}
		} );
	}
}



export default GameState;

export type {
	OB_IGameState,
	GSEvent,
	GSEventData,
}