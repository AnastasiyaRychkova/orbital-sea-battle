import { IEventProvider } from "../../util/EventEmitter/EventProvider";
import { ListenerFunc } from "../../util/EventEmitter/EventProviderInterface";
import StateMachine, { IStateMachine, MachineActionType } from "../../util/StateMachine/StateMachine";
import { ActionFunction, Context, OnDoneDataType, OnDoneFunction } from "../../util/StateMachine/StateMachineTypes";
import { OB_IEnemy, OB_ILocalPlayer } from "./OB_EntitiesFabric";
import OB_IGameState, {GSEvent, GSEventData, GSResults} from "./OB_GameStateInterface";
import { NamingContext, ShootingContext, SState } from "./types";


class GameState implements OB_IGameState
{
	#machine: IStateMachine<SState, string>;

	#player: OB_ILocalPlayer;
	#enemy: OB_IEnemy;
	#winner?: OB_ILocalPlayer | OB_IEnemy;


	constructor( player: OB_ILocalPlayer, enemy: OB_IEnemy )
	{
		this.#player = player;
		this.#enemy = enemy;
		this.#machine = this._initStateMachine();

		this.send = this.send.bind( this );
	}

	send( event: string, context?: object ): void
	{
		if( context )
			this._setEventContext( context );
		this.#machine.send( event );
	}

	private _setEventContext( context: object ): void
	{
		const deepestContext = this.#machine.deepestContext as any;
		for( const [key, value] of Object.entries( context ) )
		{
			deepestContext[ key ] = value;
		}
	}

	get state(): SState
	{
		return this.#machine.state;
	}

	on( event: GSEvent, listener: ListenerFunc<GSEventData> ): IEventProvider<GSEvent, GSEventData>
	{
		if( event === 'change' )
			this.#machine.on( 'changed', listener );
		return this;
	}

	once( event: GSEvent, listener: ListenerFunc<GSEventData> ): IEventProvider<GSEvent, GSEventData>
	{
		if( event === 'change' )
			this.#machine.once( 'changed', listener );
		return this;
	}
	remove( event: GSEvent, listener: ListenerFunc<GSEventData> ): IEventProvider<GSEvent, GSEventData>
	{
		if( event === 'change' )
			this.#machine.remove( 'changed', listener );
		return this;
	}

	/**
	 * Закончилась лл игра
	 */
	get isOver(): boolean
	{
		return this.#winner !== undefined;
	}

	private _deepestContext( contexts: Context[] ): Context
	{
		return contexts[ contexts.length - 1 ];
	}

	private _playerShotHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._deepestContext( machine.context ) as ShootingContext;
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

	private _enemyShotHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._deepestContext( machine.context ) as ShootingContext;
		const cell = context.shot;
		if( !cell )
			throw new Error("Enemy shot cell is not defined");

		const result = this.#player.markEnemyShot( cell );
		this.#enemy.markShotResult( cell, result );
		context.shot = undefined;
	}

	private _enemyNamingHandler: ActionFunction<SState> = ( machine: MachineActionType<SState> ) => {
		const context = this._deepestContext( machine.context ) as NamingContext;
		const elem = context.namedElemNumber;
		if( !elem )
			throw new Error("Enemy naming element number is not defined");

		this.#winner = this.#player.isThisElementSelected( elem ) ? this.#enemy : this.#player;
		this.#enemy.finishGame();
		this.#player.finishGame();
	}

	private _emitGameResults: ActionFunction<SState> = () => {
		/* const results: GSResults = {
			isLocalPlayerWinner: this.#winner === this.#player,
			player: this.#player.
		} */
		throw new Error( 'Not implemented' );
	}


	private _initStateMachine(): IStateMachine<SState, string>
	{
		const completeFunc = ( machine: MachineActionType<SState> ) => {
			machine.complete();
		};

		return new StateMachine<SState, string>( {
			initial: 'preparing',
			states: {
				preparing: {
					invoke: {
						initial: 'selecting',
						states: {
							selecting: {
								invoke: {
									initial: 'instruction',
									states: {
										instruction: {
											on: {
												start: 'choice',
											},
										},
										choice: {
											on: {
												confirm: 'saving',
												give_in: 'giving_in',
											}
										},
										saving: {
											on: {
												valid: 'end',
												invalid: 'choice',
											}
										},
										giving_in: {
											on: {
												cancel: 'choice',
											},
										},
										end: {
											entry: completeFunc,
										}
									},
									onDone: 'selected',
								},
								on: {
									selected: 'filling',
								},
							},
							filling: {
								invoke: {
									initial: 'instruction',
									states: {
										instruction: {
											on: {
												start: 'diagram',
											},
										},
										diagram: {
											on: {
												check: 'checking',
												give_in: 'giving_in',
											},
										},
										checking: {
											on: {
												fail: 'diagram',
												correct: 'end',
											}
										},
										giving_in: {
											on: {
												cancel: 'checking',
											}
										},
										end: {
											entry: completeFunc,
										},
									},
									onDone: 'ready',
								},
								on: {
									change: 'selecting',
									ready: 'end',
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
						ready: 'shooting',
						leave: 'surrender',
					}
				},
				shooting: {
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
									give_in: 'giving_in',
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
					on: {
						complete: 'results',
						giving_in_confirm: 'results',
					},
				},
				results: {
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
					on: {
						complete: 'end',
						rematch: 'preparing',
					}
				},
				end: {
					entry: completeFunc,
				}
			}
		} );
	}
}



export default GameState;