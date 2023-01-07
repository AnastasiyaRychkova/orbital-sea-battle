import coins from "../Coin"

describe( 'Economy: Coin', () => {
	test( 'creating', () => {
		const VALUE = 5;
		expect( coins( VALUE ).value ).toBe( VALUE );
	} );

	test( 'creating with negative value', () => {
		expect( coins( -5 ).value ).toBe( 0 );
	} );

	test( 'creating with float value', () => {
		expect( coins( 1.2 ).value ).toBe( 1 );
		expect( coins( 1.8 ).value ).toBe( 1 );
		expect( coins( -1.2 ).value ).toBe( 0 );
	} );

	test( 'summation: int', () => {
		const INIT_VALUE = 5;
		const testedValue = coins( INIT_VALUE );
		expect( testedValue.plus( coins( 5 ) ).value ).toBe( 10 );
		expect( testedValue.value ).toBe( INIT_VALUE );
	} );

	test( 'summation', () => {
		const X = 5;
		const testedValue = coins( X );
		expect( testedValue.plus( coins( 5 ) ).value ).toBe( 10 );
		expect( testedValue.value ).toBe( X );
	} );

	test( 'subtraction', () => {
		const X = 5;
		const testedValue = coins( X );
		expect( testedValue.minus( coins( 3 ) ).value ).toBe( 2 );
		expect( testedValue.minus( coins( 10 ) ).value ).toBe( 0 );
		expect( testedValue.value ).toBe( X );
	} );

	test( 'multiplication', () => {
		const X = 5;
		const testedValue = coins( X );
		expect( testedValue.times( 3 ).value ).toBe( 15 );
		expect( testedValue.times( 0.2 ).value ).toBe( 1 );
		expect( testedValue.times( -0.2 ).value ).toBe( 0 );
		expect( testedValue.value ).toBe( X );
	} );
} );