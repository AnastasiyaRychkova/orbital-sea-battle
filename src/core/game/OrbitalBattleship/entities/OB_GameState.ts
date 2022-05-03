import EventProvider, { IEventProvider, ListenerFunc } from "../../../util/EventEmitter/EventProvider";
import StateMachine, { IStateMachine, MachineActionType } from "../../../util/StateMachine/StateMachine";
import OB_IGameState, {GSEvent, GSEventData, GSResults} from "../interfaces/OB_GameStateInterface";

import type { ActionFunction, Context, OnDoneDataType } from "../../../util/StateMachine/StateMachineTypes";
import type { OB_IEnemy, OB_ILocalPlayer, OB_IPlayer } from "../OB_Entities";
import type {
	EventContext,
	NamingContext,
	SelectingContext,
	ShootingContext,
	SState,
	RootContext,
} from "../types";

type SEvent = string;

type Milliseconds = number;
type Seconds = number;


/* TODO:
* PlayerController
* Тестирование GameState
* Авторизация
* Статистика
* Покупка подсказок
* Покупка Оболочек
*/



class GameState extends EventProvider<GSEvent, GSEventData> implements OB_IGameState
{
	#machine: IStateMachine<SState, string>;

	#player: OB_ILocalPlayer;
	#enemy: OB_IEnemy;
	#winner?: OB_IPlayer;


	#DIAGRAM_CHECKING_TIMEOUT = 1000;


	constructor( player: OB_ILocalPlayer, enemy: OB_IEnemy )
	{
		super();
		this.#player = player;
		this.#enemy = enemy;
		this.#machine = this._initStateMachine();

		this.send = this.send.bind( this );
	}

	get player(): OB_ILocalPlayer
	{
		return this.#player;
	}

	get enemy(): OB_IEnemy
	{
		return this.#enemy;
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

	private _delaySendingEvent( event: SEvent, delay: Milliseconds ): () => void
	{
		return () => {
			setTimeout( () => this.#machine.send( event ), delay );
		}
	}

	private _markOnboardingComplete( prop: keyof RootContext ): ActionFunction<SState>
	{
		return ( machine: MachineActionType<SState> ) => {
			(machine.context[0] as RootContext)[ prop ] = true;
		};
	}

	private _skipOnboarding( prop: keyof RootContext ): ActionFunction<SState>
	{
		return ( machine: MachineActionType<SState> ) => {
			if( (machine.context[0] as RootContext)[ prop ] )
				setTimeout( () => {this.#machine.send( 'start' )} );
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
	 * moving --(shot)--> result_waiting
	 */
	private _playerShotHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as ShootingContext;
		const cell = context.shot;
		if( !cell )
			throw new Error("Enemy shot cell is not defined");

		this.#enemy.markEnemyShot( cell )
			.then( ( result: boolean ) => {
				this.#player.markShotResult( cell, result );
				context.shot = undefined;
				setTimeout( this.send, 0, 'shot' );
			} );
	}

	/**
	 * enemy_waiting --(shot)--> moving
	 */
	private _enemyShotHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as ShootingContext;
		const cell = context.shot;
		if( !cell )
			throw new Error("Enemy shot cell is not defined");

		const result = this.#player.markEnemyShot( cell );
		this.#enemy.markShotResult( cell, result );
		context.shot = undefined;
	}

	/**
	 * enemy_waiting --(name)--> end
	 */
	private _enemyNamingHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._eventContext( machine.context ) as NamingContext;
		const elem = context.namedElemNumber;
		if( !elem )
			throw new Error("Enemy naming element number is not defined");

		this._finishGameWithWinner( this.#player.isThisElementSelected( elem ) ? this.#enemy : this.#player )
	}

	/**
	 * ->* finish
	 */
	private _emitGameResults: ActionFunction<SState> = () => {
		if( !this.isOver )
			this._finishGameWithWinner( this.#enemy );

		this._emit(
			'finish',
			{
				isLocalPlayerWinner: this.#winner === this.#player,
				player: this.#player.getResults()!,
				enemy: this.#enemy.getResults()!,
				duration: 0, // FIXME: Match duration
			}
		);
	}


	/**
	 * Номинально завершить игру для обоих игроков и матча
	 * @param winner Победитель
	 */
	private _finishGameWithWinner( winner: OB_IPlayer ): void
	{
		this.#winner = winner;
		this.#enemy.finishGame();
		this.#player.finishGame();
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
												give_in: 'giving_in',
											}
										},
										giving_in: {
											on: {
												cancel: 'choice',
											},
										},
									},
									onDone: 'select',
								},
							},
							filling: {
								on: {
									change: 'selecting',
									ready: 'end',
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
												give_in: 'giving_in',
											},
										},
										correct: {
											entry: this._delaySendingEvent( 'ready', this.#DIAGRAM_CHECKING_TIMEOUT ),
										},
										fail: {
											delay: {
												after: this.#DIAGRAM_CHECKING_TIMEOUT,
												to: 'diagram',
											},
										},
										giving_in: {
											on: {
												cancel: 'diagram',
											}
										},
										end: {
											entry: completeFunc,
										},
									},
									onDone: 'ready',
								},
							},
							end: {
								entry: completeFunc,
							},
						},
						onDone: 'ready',
					},
					on: {
						giving_in_confirm: 'surrender',
						ready: 'waiting',
					},
				},
				surrender: { // TODO: По нажатию по экрану пропустить ожидание
					delay: {
						to: 'end',
						after: 3,
					},
				},
				waiting: {
					on: {
						play: 'shooting',
						leave: 'surrender',
					}
				},
				shooting: {
					on: {
						complete: 'results',
						giving_in_confirm: 'results',
					},
					invoke: {
						initial: 'instruction',
						states: {
							instruction: {
								on: {
									my_turn: 'moving',
									enemy_turn: 'enemy_waiting',
								},
							},
							moving: {
								on: {
									shot: { to: 'result_waiting', do: this._playerShotHandler },
									name: 'result_waiting',
								},
							},
							enemy_waiting: {
								on: {
									shot: { to: 'moving', do: this._enemyShotHandler },
									name: { to: 'end', do: this._enemyNamingHandler },
								}
							},
							result_waiting: {
								on: {
									shot: 'enemy_waiting',
									game_results: 'end',
								},
							},
							end: {
								entry: completeFunc,
							},
						},
						onDone: 'complete', // TODO: Условный переход
					},
				},
				results: {
					on: {
						complete: 'end',
						rematch: 'preparing',
					},
					invoke: {
						initial: 'final',
						entry: this._emitGameResults,
						states: {
							final: {
								on: {
									send_request: 'request',
									get_request: 'response',
									offline: 'rematch_unavailable',
								},
							},
							request: {
								on: {
									confirm: 'rematch_confirmed',
									reject: 'rematch_unavailable',
								},
							},
							response: {
								on: {
									confirm: 'rematch_confirmed',
									reject: 'rematch_unavailable'
								},
							},
							rematch_unavailable: {
								on: {
									exit: 'end',
								},
							},
							rematch_confirmed: {
								entry: completeFunc,
							},
							end: {
								entry: completeFunc,
							}
						},
						onDone: ( machine: OnDoneDataType<SState> ) => {
							return machine.state === 'rematch_confirmed'
								? 'rematch'
								: 'complete' ;
						},
					},
				},
				end: {
					entry: completeFunc,
				}
			}
		} );
	}
}



export default GameState;