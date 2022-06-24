import converter from "../QNtoIndexConverter"
import Chemistry from "../index"


describe( 'Quantum Numbers to cell index converter testing', () => {

	test( 'creating cell index function is defined', () => {
		expect( Chemistry.cellIndex ).not.toBeUndefined();
	} );

	test( 'converting cell quantum numbers to Cell Index', () => {
		const cellQN = Chemistry.cell( {n: 4, l: 'd', m: 2, s: 1} );
		expect( converter.toIndex( cellQN )?.value ).toBe( 38 );
	} );

	test( 'converting numeric cell index to cell quantum numbers', () => {
		const cell = converter.toQN( 38 );
		expect( cell ).not.toBeUndefined();
		expect( cell!.n.value ).toBe( 4 );
		expect( cell!.l.toString() ).toBe( 'd' );
		expect( cell!.m.value ).toBe( 2 );
		expect( cell!.s.value ).toBe( 1 );
	} );
} )