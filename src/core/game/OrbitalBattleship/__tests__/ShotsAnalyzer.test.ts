import Chemistry, { QNtoIndexConverter as converter } from "../../Chemistry";
import ShotsAnalyzer from "../entities/OB_ShotsAnalyzer";


describe( 'Shots Analyzer', () => {
	const analyzer = new ShotsAnalyzer();
	const randomFunc = Math.random;

	test( 'testing new analyzer', () => {
		expect( analyzer.candidates ).toBe( 118 );		
	} );

	test( 'random getting cell, when candidates are 118: random = 1', () => {
		Math.random = () => 1;
		const cell = analyzer.pickOutCell();
		expect( cell ).not.toBeUndefined();
		expect( converter.toIndex( cell! )?.value ).toBe( 117 );
		Math.random = randomFunc;
	} );

	test( 'random getting cell, when candidates are 118: random != 0|1', () => {
		Math.random = () => 0.8547;
		const cell = analyzer.pickOutCell();
		expect( cell ).not.toBeUndefined();
		expect( converter.toIndex( cell! )?.value ).toBe( 100 );
		Math.random = randomFunc;
	} );

	test( 'random getting cell, when candidates are 118: random = 0', () => {
		Math.random = () => 0;
		const cell = analyzer.pickOutCell();
		expect( cell ).not.toBeUndefined();
		expect( converter.toIndex( cell! )?.value ).toBe( 0 );
		Math.random = randomFunc;
	} );


	test( 'first shot (miss)', () => {
		const cellQN = Chemistry.cell( {n: 4, l: 'd', m: 2, s: 1} )
		analyzer.markShot( cellQN, false );

		expect( analyzer.candidates ).toBe( 38 );
		expect( analyzer.undefinedCells ).toBe( analyzer.candidates - 1 );
	} );

	test( 'second shot (hit)', () => {
		analyzer.markShot( Chemistry.cell( {n: 4, l: 'p', m: -1, s: -1} ), true );

		expect( analyzer.candidates ).toBe( 3 );
		expect( analyzer.undefinedCells ).toBe( 2 );
		expect( converter.toIndex(analyzer.pickOutCell()!)?.value ).toBe(37);
	} );

	test( 'unambiguous definition', () => {
		analyzer.markShot( Chemistry.cell( {n: 5, l: 's', m: 0, s: -1} ), true );

		expect( analyzer.candidates ).toBe( 1 );
		expect( analyzer.undefinedCells ).toBe( 0 );

		expect( analyzer.pickOutCell() ).toBeUndefined();
		expect( analyzer.pickOutElement()?.number ).toBe( 38 );
	} );

	test( 'impossible configuration', () => {
		analyzer.markShot( Chemistry.cell( {n: 5, l: 'd', m: 2, s: 1} ), true );

		expect( analyzer.candidates ).toBe( 0 );
		expect( analyzer.undefinedCells ).toBe( 0 );
	} );

	test( 'shots counting', () => {
		expect( analyzer.shots ).toBe( 4 );
	} )
} );