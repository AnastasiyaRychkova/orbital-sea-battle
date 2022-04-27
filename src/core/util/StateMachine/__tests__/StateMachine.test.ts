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
		expect( machine.isCompleted ).toBeTruthy();
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
					'1': {
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
								'AC.3': {
									to: 'AD',
									do: () => { testedStr += 'tAC3_' }
								},
							},
							entry: () => { testedStr += 'sACi_' },
							exit: () => { testedStr = 'sACo_' },
						},
						AD: {
							on: {
								'1': {
									to: 'AD',
									do: () => { testedStr += 'tAD1_' }
								},
								'AD.4': 'AC',
								'AD.8': {
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
					'B.2': 'C',
				},
				invoke: () => ({
					initial: 'BE',
					entry: () => { testedStr += 'mBi_' },
					exit: () => { testedStr += 'mBo_' },
					states: {
						BE: {
							on: {
								'BE.5': 'BF',
								'BE.6': {
									to: 'BF',
									do: ( machine: MachineActionType<string> ) => { machine.complete() },
								}
							},
							entry: () => { testedStr += 'sBEi_' },
							exit: () => { testedStr += 'sBEo_' },
						},
						BF: {}
					},
					onDone: 'B.2',
				}),
				entry: () => { testedStr += 'sBi_' },
				exit: () => { testedStr += 'sBo_' },
			},
			'C': {
				on: {
					'C.7': { to: 'D', do: () => { 
						testedStr += machine.hasEvent( 'CG.9' ) ? '1' : '0'; 
						testedStr += machine.hasEvent( 'C.7' ) ? '1' : '0'; 
						testedStr += machine.hasEvent( 'D.14' ) ? '1' : '0'; 
					} },
				},
				invoke: {
					initial: 'CG',
					context: {
						name: 'M2c_'
					},
					states: {
						CG: {
							on: {
								"CG.9": 'CH',
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
											'CGI.11': 'CGJ',
											'CGI.12': 'CGK',
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
								'CH.10': 'CG'
							}
						}
					}
				}
			},
			'D': {
				on: {
					'D.13': 'A',
					'D.14': 'C',
					'D.15': 'D',
				}
			}
		}
	} );

	// * --> AC
	test( 'Nested machine creation', () => {
		expect( machine.state ).toBe( 'AC' );
		expect( testedStr ).toBe( 'mi_sAi_mAi_sACi_' );
	} );

	// AC --(AC.3)--> AD
	test( 'transition inside nested machine', () => {
		machine.send( 'AC.3' );
		expect( machine.state ).toBe( 'AD' );
		expect( testedStr ).toBe( 'sACo_tAC3_sADi_' );
	} );

	// AD
	test( 'not valid event', () => {
		expect( machine.hasEvent( 'error' ) ).toBeFalsy();
		expect( machine.send( 'error' ) ).toBeFalsy();
		expect( machine.state ).toBe( 'AD' );
	} );

	// AD --(AD.1)--> AD
	test( 'repeated event names at different nesting levels', () => {
		expect( machine.send( '1' ) ).toBeTruthy();
		expect( machine.state ).toBe( 'AD' );
		expect( testedStr ).toBe( 'sACo_tAC3_sADi_sADo_tAD1_sADi_' )
	} );

	test( 'depth calculation', () => {
		expect( machine.depth ).toBe( 2 );
	} );

	// AD --(AD.8)-->>A[x]
	test( 'complete nested machine without auto transition', () => {
		expect( machine.send( 'AD.8' ) ).toBeTruthy();
		expect( machine.state ).toBe( 'A' );
		expect( machine.depth ).toBe( 1 );
	} );

	// A --(A.1)--> B>>-> BE
	// BE --(BE.6)-->>B[x]>>->(B.2)--> C>>->CG>>->CGI
	test( 'complete nested machine with auto transition', () => {
		machine.send( '1' );
		expect( machine.state ).toBe( 'BE' );
		expect( ( machine as unknown as IMachineNodeTesting )._width ).toBe( 6 );

		machine.send( 'BE.6' );
		expect( machine.state ).toBe( 'CGI' );
		expect( ( machine as unknown as IMachineNodeTesting )._width ).toBe( 9 );
	} );

	test( 'nested context objects', () => {
		expect( testedStr ).toBe( 'M3cg_M2c_M1_' )
	} );

	test( 'checking available transitions', () => {
		expect( machine.hasEvent( 'CGI.12' ) ).toBeTruthy();
		expect( machine.hasEvent( 'CG.9' ) ).toBeTruthy();
		expect( machine.hasEvent( 'C.7' ) ).toBeTruthy();
		expect( machine.hasEvent( 'CH.10' ) ).toBeFalsy();
	} )

	// CGI --(CGI.11)--> CGJ
	test( 'empty state', () => {
		machine.send( 'CGI.11' );
		expect( machine.state ).toBe( 'CGJ' );
	} );

	// CGJ --(C.7)-->>CG[x]>>->>C[x]>>-> D
	test( 'deleting nested machines with transition', () => {
		testedStr = '';
		machine.send( 'C.7' );
		expect( machine.state ).toBe( 'D' );
		expect( ( machine as unknown as IMachineNodeTesting )._width ).toBe( 4 );
		expect( testedStr ).toBe( '001' );
	} );

	test( 'states chain consists only one state', () => {
		expect( machine.statesChain ).toHaveLength( 1 );
	} );

	// D --(D.14)--> C>>->CG>>->CGI
	// CGI --(CGI.12)--> CGK
	test( 'state changing event listening', () => {
		machine.send( 'D.14' );
		testedStr = '';
		const listener = ( data: EventData<string> ) => {
			testedStr += data.detail.state.join( '_' );
		};
		machine.once( 'changed', listener );
		machine.send( 'CGI.12' );

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