import { StateMachine } from "../StateMachine"

describe( 'State Machine', () => {
	let isEnd = false;
	const machine = new StateMachine( {
		initial: 'state1',
		states: {
			'state1': {
				on: {
					next: 'state2',
				}
			},
			'state2': {
				on: {
					next: 'state3',
				}
			},
			'state3': {
				on: {
					next: '__END__',
				}
			}
		},
		exit: ( state: string ) => { isEnd = true; },
		context: {},
	});

	test( 'testing the construction and initialization of the machine', () => {
		expect( machine.value ).toEqual( 'state1' );
	})

	test( 'testing the transition to the next state 2', () => {
		machine.send( 'next' );
		expect( machine.value ).toEqual( 'state2');
	})

	test( 'testing the ending of state machine', () => {
		machine.send( 'next' );
		machine.send( 'next' );
		expect( isEnd ).toBeTruthy();
	})
})