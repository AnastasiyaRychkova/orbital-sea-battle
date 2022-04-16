import { IEventProvider } from "../../util/EventEmitter/EventProvider";
import { ListenerFunc } from "../../util/EventEmitter/EventProviderInterface";
import StateMachine, { IStateMachine, MachineActionType } from "../../util/StateMachine/StateMachine";
import { OnDoneDataType, OnDoneFunction } from "../../util/StateMachine/StateMachineTypes";
import OB_IGameState, {GSEvent, GSEventData} from "./OB_GameStateInterface";
import { SState } from "./types";


class GameState implements OB_IGameState
{
	#machine: IStateMachine<SState, string>
	constructor()
	{
		this.#machine = this._initStateMachine();
	}

	send( event: string ): void
	{
		this.#machine.send( event );
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
									shot: 'result_waiting',
									name: 'result_waiting',
									give_in: 'giving_in',
								},
							},
							enemy_waiting: {
								on: {
									shot: 'moving',
									name: 'end',
								}
							},
							result_waiting: {
								on: {
									shot: 'enemy_waiting',
									game_results: 'end',
								}
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