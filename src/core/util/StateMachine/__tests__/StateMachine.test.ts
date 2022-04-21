import StateMachine, { EventData } from "../StateMachine";
import type {
	Context,
	IStateMachine,
	IMachineNodeTesting,
	MachineActionType,
} from '../StateMachineTypes';


describe( 'Simple State Machine', () => {
	let isActive: boolean = false;
	let testedStr: string = '';
	
	const machine: IStateMachine<string, string> = new StateMachine<string, string>( {
		initial: 'A',
		states: {
			'A': {
				on: {
					toB: {
						to: 'B',
						do: () => { testedStr += 'sABt_'; }
					},
					toC: 'C',
				},
				entry: () => { testedStr += 'sAi_'; },
				exit: (
						machine: MachineActionType<string>
					) => {
						testedStr += 'sAo_';
						(machine.context[0] as any).str += machine.state;
					},
			},
			'B': {
				on: {
					toC: 'C',
				},
				entry: () => { testedStr += 'sBi_'; },
			},
			'C': {
				on: {
					toA: 'A',
				},
				entry: () => { testedStr = 'sCi_'; },
				delay: {
					to: 'D',
					after: 1,
				},
			},
			'D': {
				on: {
					complete: 'end',
				},
				entry: () => { testedStr += 'sDi_'; },
				exit: () => { testedStr += 'sDo_'; },
			},
			'end': {
				entry: ( machine: MachineActionType<string> ) => {
						machine.complete();
					},
			}
		},
		entry: () => { isActive = true; testedStr += 'mi_' },
		exit: () => { isActive = false; testedStr = 'complete' },
		context: {
			str: '_',
		},
	});

	test( 'construction and initialization of the machine', () => {
		expect( machine.state ).toEqual( 'A' );
	});

	test( 'initial state call entry function', () => {
		expect( testedStr ).toBe( 'mi_sAi_' );
	} );

	test( 'state machine call entry function', () => {
		expect( isActive ).toBe( true );
	} );

	test( 'context object in state machine is available', () => {
		expect( machine.context[0].hasOwnProperty( 'str' ) ).toBeTruthy();
	} );

	test( 'transitions between states', () => {
		machine.send( 'toB' );
		expect( machine.state ).toEqual( 'B' );
	});

	test( 'state exit function call & transition call', () => {
		expect( testedStr ).toBe( 'mi_sAi_sAo_sABt_sBi_' );
	} );

	test( 'context object and state name is available inside transition function', () => {
		expect( (machine.context[0] as any).str ).toBe( '_A' );
	} );

	test( 'delayed transition', () => {
		jest.useFakeTimers();
		machine.send( 'toC' );
		jest.runAllTimers();
		expect( testedStr ).toBe( 'sCi_sDi_' );
		expect( machine.state ).toBe( 'D' );
	} );

	test( 'completing state machine work', () => {
		machine.send( 'complete' );
		expect( machine.isComplete ).toBeTruthy();
	} );

	test( 'state machine call exit function', () => {
		expect( isActive ).toBeFalsy();
	} );

	test( 'state node call exit function after SM.complete()', () => {
		expect( testedStr ).toBe( 'complete' );
		expect( machine.state ).toBe( 'end' );
	} )

	
});

describe( 'Nested State Machine', () => {
	let testedStr = '';
	const machine: IStateMachine<string, string> = new StateMachine<string, string>( {
		initial: 'A',
		entry: () => { testedStr += 'mi_' },
		exit: () => { testedStr += 'mo_' },
		context: {
			name: 'M1_',
		},
		states: {
			'A': {
				on: {
					1: {
						to: 'B',
						do: () => { testedStr += 'tA1_' }
					},
				},
				invoke: {
					initial: 'AC',
					entry: () => { testedStr += 'mAi_' },
					exit: () => { testedStr += 'mAo_' },
					states: {
						AC: {
							on: {
								3: {
									to: 'AD',
									do: () => { testedStr += 'tAC3_' }
								},
							},
							entry: () => { testedStr += 'sACi_' },
							exit: () => { testedStr = 'sACo_' },
						},
						AD: {
							on: {
								1: {
									to: 'AD',
									do: () => { testedStr += 'tAD1_' }
								},
								4: 'AC',
								8: {
									to: 'AD',
									do: ( machine: MachineActionType<string> ) => { machine.complete() }
								}
							},
							entry: () => { testedStr += 'sADi_' },
							exit: () => { testedStr += 'sADo_' }
						}
					},
				},
				entry: () => { testedStr += 'sAi_' },
				exit: () => { testedStr += 'sAo_' },
			},
			'B': {
				on: {
					2: 'C',
				},
				invoke: () => ({
					initial: 'BE',
					entry: () => { testedStr += 'mBi_' },
					exit: () => { testedStr += 'mBo_' },
					states: {
						BE: {
							on: {
								5: 'BF',
								6: {
									to: 'BF',
									do: ( machine: MachineActionType<string> ) => { machine.complete() },
								}
							},
							entry: () => { testedStr += 'sBEi_' },
							exit: () => { testedStr += 'sBEo_' },
						},
						BF: {}
					},
					onDone: '2',
				}),
				entry: () => { testedStr += 'sBi_' },
				exit: () => { testedStr += 'sBo_' },
			},
			'C': {
				on: {
					7: 'D',
				},
				invoke: {
					initial: 'CG',
					context: {
						name: 'M2c_'
					},
					states: {
						CG: {
							on: {
								9: 'CH',
							},
							delay: {
								to: 'CH',
								after: 60,
							},
							invoke: {
								initial: 'CGI',
								context: {
									name: 'M3cg_'
								},
								states: {
									CGI: {
										on: {
											11: 'CGJ',
											12: 'CGK',
										},
										entry: ( machine: MachineActionType<string> ) => {
											testedStr = (machine.context[2] as any).name;
											const m2 = machine.context[1] as any;
											if( m2 )
											{
												testedStr += m2.name;
												const m1 = machine.context[0] as any;
												if( m1 )
													testedStr += m1.name;
											}
										}
									},
									CGJ: {},
									CGK: {
										delay: {
											to: 'CGI',
											after: 20,
										}
									}
								}
							},
						},
						CH: {
							on: {
								10: 'CG'
							}
						}
					}
				}
			},
			'D': {
				on: {
					13: 'A',
					14: 'C',
					15: 'D',
				}
			}
		}
	} );

	test( 'Nested machine creation', () => {
		expect( machine.state ).toBe( 'AC' );
		expect( testedStr ).toBe( 'mi_sAi_mAi_sACi_' );
	} );

	test( 'transition inside nested machine', () => {
		machine.send( '3' );
		expect( machine.state ).toBe( 'AD' );
		expect( testedStr ).toBe( 'sACo_tAC3_sADi_' );
	} );

	test( 'not valid event', () => {
		expect( machine.send( 'error' ) ).toBeFalsy();
		expect( machine.state ).toBe( 'AD' );
	} );

	test( 'repeated event names at different nesting levels', () => {
		expect( machine.send( '1' ) ).toBeTruthy();
		expect( machine.state ).toBe( 'AD' );
		expect( testedStr ).toBe( 'sACo_tAC3_sADi_sADo_tAD1_sADi_' )
	} );

	test( 'depth calculation', () => {
		expect( machine.depth ).toBe( 2 );
	} );

	test( 'complete nested machine without auto transition', () => {
		expect( machine.send( '8' ) ).toBeTruthy();
		expect( machine.state ).toBe( 'A' );
		expect( machine.depth ).toBe( 1 );
	} );

	test( 'complete nested machine with auto transition', () => {
		machine.send( '1' );
		expect( machine.state ).toBe( 'BE' );
		expect( ( machine as unknown as IMachineNodeTesting )._width ).toBe( 6 );

		machine.send( '6' );
		expect( machine.state ).toBe( 'CGI' );
		expect( ( machine as unknown as IMachineNodeTesting )._width ).toBe( 9 );
	} );

	test( 'nested context objects', () => {
		expect( testedStr ).toBe( 'M3cg_M2c_M1_' )
	} )

	test( 'empty state', () => {
		machine.send( '11' );
		expect( machine.state ).toBe( 'CGJ' );
	} );

	test( 'deleting nested machines with transition', () => {
		machine.send( '7' );
		expect( machine.state ).toBe( 'D' );
		expect( ( machine as unknown as IMachineNodeTesting )._width ).toBe( 4 );
	} );

	test( 'states chain consists only one state', () => {
		expect( machine.statesChain ).toHaveLength( 1 );
	} )

	test( 'state changing event listening', () => {
		machine.send( '14' );
		testedStr = '';
		const listener = ( data: EventData<string> ) => {
			testedStr += data.detail.state.join( '_' );
		};
		machine.once( 'changed', listener );
		machine.send( '12' );

		expect( testedStr ).toBe( 'C_CG_CGK' );

	} );

	test( 'getting the chain of states, which length is more then one', () => {
		const statesChain = machine.statesChain;
		expect( statesChain ).toHaveLength( 3 );
		expect( statesChain ).toEqual( [ 'C', 'CG', 'CGK' ] );
	} );

	test( 'run all delayed transition', () => {
		expect( machine.runAllDelayedTransitions() ).toBeTruthy();
		expect( machine.state ).toBe( 'CH' );
	} )
} );