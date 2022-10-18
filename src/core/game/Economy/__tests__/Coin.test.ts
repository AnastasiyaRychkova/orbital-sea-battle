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
		expect( testedValue.plus( 5 ).value ).toBe( 10 );
		expect( testedValue.value ).toBe( INIT_VALUE );
	} );

	test( 'summation: positive int', () => {
		const X = 5;
		const testedValue = coins( X );
		expect( testedValue.plus( coins( 5 ) ).value ).toBe( 10 );
		expect( testedValue.plus( 5 ).value ).toBe( 10 );
		expect( testedValue.value ).toBe( X );
	} );

	test( 'summation: negative int', () => {
		const X = 5;
		const testedValue = coins( X );
		expect( testedValue.plus( coins( -5 ) ).value ).toBe( 5 );
		expect( testedValue.plus( -5 ).value ).toBe( 0 );
		expect( testedValue.value ).toBe( X );
	} );

	test( 'summation: positive float', () => {
		const X = 5;
		const testedValue = coins( X );
		expect( testedValue.plus( coins( 5.2 ) ).value ).toBe( 10 );
		expect( testedValue.plus( 5.8 ).value ).toBe( 10 );
		expect( testedValue.value ).toBe( X );
	} );

	test( 'summation: negative float', () => {
		const X = 5;
		const testedValue = coins( X );
		expect( testedValue.plus( coins( -1.2 ) ).value ).toBe( 5 );
		expect( testedValue.plus( -0.2 ).value ).toBe( 4 );
		expect( testedValue.plus( -0.8 ).value ).toBe( 4 );
		expect( testedValue.value ).toBe( X );
	} );
} );