import Stopwatch from "../Stopwatch"

describe( 'Stopwatch', () => {
	test( 'Initialization with value', () => {
		const initValue = 10;
		expect( new Stopwatch( initValue ).value ).toBe( initValue );
	} );

	test( 'Initialization with a negative value', () => {
		const initValue = -10;
		expect( new Stopwatch( initValue ).value ).toBe( 0 );
	} );

	test( 'Initialization with a float value', () => {
		expect( new Stopwatch( 10.7 ).value ).toBe( 10 );
	} );

	test( 'Stopping the stopwatch does not reset its value', () => {
		const initValue = 10;
		const stopwatch = new Stopwatch( initValue );
		stopwatch.start();
		stopwatch.stop();
		expect( stopwatch.value ).toBeGreaterThanOrEqual( initValue );
	} );

	test( 'Resetting stop stopwatch', () => {
		const stopwatch = new Stopwatch( 10 );
		expect( stopwatch.isRunning ).toBeFalsy();
		stopwatch.start();
		expect( stopwatch.isRunning ).toBeTruthy();
		
		stopwatch.reset();
		expect( stopwatch.isRunning ).toBeFalsy();
		expect( stopwatch.value ).toBe( 0 );
	} )

	test( 'To string: clear state', () => {
		const time = new Date(0);
		expect( new Stopwatch( time ).toString() ).toBe( '00:00:00' );
	} );

	test( 'To string: adding zeros', () => {
		const time = new Date( '1970/01/01 02:30:07 +0000' );
		expect( new Stopwatch( time ).toString() ).toBe( '02:30:07' );
	} );

	test( 'To string: duration is more than day', () => {
		const time = new Date( '1970/01/02 02:30:07 +0000' );
		expect( new Stopwatch( time ).toString() ).toBe( '26:30:07' );
	} );
} )