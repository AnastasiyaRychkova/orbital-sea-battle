import { CHEMICAL_ELEM_NUM } from '../constants';
import { EDiagramCellState } from "../DiagramCell";
import { ElemConfig, SpinIndex } from "../index";

import type { SpinState } from '../DiagramCell';


describe( 'Element Configuration', ()=> {
	test( 'whether the configuration created by default and from the array will be equivalent', () => {
		const defaultConfig = new ElemConfig();
		const arrayConfig = new ElemConfig( [ 0, 0, 0, 0 ]);

		expect( defaultConfig.isEqual( arrayConfig ) ).toBeTruthy();
	});

	test( 'whether the configuration created form short array and from full array will be equivalent', () => {
		const shortConfig = new ElemConfig( [ 255, 255 ] );
		const fullConfig = new ElemConfig( [ 255, 255, 0, 0 ] );

		expect( shortConfig.isEqual( fullConfig ) ).toBeTruthy();
	});

	test( 'whether the configuration created form long array and from full array will be equivalent', () => {
		const longConfig = new ElemConfig( [ 255, 255, 1023, 2047, 511, 8, 2 ] );
		const fullConfig = new ElemConfig( [ 255, 255, 1023, 2047] );

		expect( longConfig.isEqual( fullConfig ) ).toBeTruthy();
	});

	test( 'whether the configuration created form long array and from Int32Array array will be equivalent', () => {
		const initializingArray = [ 255, 255, 1023, 2047, 511, 8, 2 ];
		const longConfig = new ElemConfig( initializingArray );
		const intConfig = new ElemConfig( new Int32Array( [ 255, 255, 1023, 2047, 511, 8, 2 ] ) );

		expect( longConfig.isEqual( intConfig ) ).toBeTruthy();
	});

	test( 'check the translation of Int32Array to number[]', () => {
		const initializingArray = [ 255, 1023, 2047, 511 ];
		const testedConfig = new ElemConfig( initializingArray );

		expect( testedConfig.toNumArray() ).toEqual( initializingArray );
	});

	test( 'check initialization with an array containing float values', () => {
		const initializingArray = [ 255.2, 1023.5, 2047.7, 511.0000000001 ];
		const expectedArray = [ 255, 1023, 2047, 511 ]
		const testedConfig = new ElemConfig( initializingArray );

		expect( testedConfig.toNumArray() ).toEqual( expectedArray );
	});



	test( 'check the last marked spin', () => {
		const platinum = new ElemConfig( [ -1, -1, 32765, 0 ] );
		expect( platinum.hasSpin( new SpinIndex( 78 ) ) ).toBeTruthy();
	});

	test( 'check the first unmarked spin', () => {
		const platinum = new ElemConfig( [ -1, -1, 32765, 0 ] );
		expect( platinum.hasSpin( new SpinIndex( 79 ) ) ).not.toBeTruthy();
	});

	test( 'check mark spin', () => {
		const spin: SpinIndex = new SpinIndex( 96 );

		expect( new ElemConfig()
					.write( spin, true )
					.hasSpin( spin )
				).toBeTruthy();
	});

	test( 'check remove spin', () => {
		const spin: SpinIndex = new SpinIndex( 96 );

		expect( new ElemConfig( [-1,-1,-1,-1] )
					.write( spin, false )
					.hasSpin( spin )
				).not.toBeTruthy();
	});

	test( 'Binary operators: AND', () => {
		const elemA = new ElemConfig( [255, 0, -1, 3] );
		const elemB = new ElemConfig( [0, 0, -1, 2] );
		expect( ElemConfig.AND( elemA, elemB ).toNumArray() ).toEqual( [0, 0, -1, 2] );
	} );

	test( 'Binary operators: OR', () => {
		const elemA = new ElemConfig( [255, 0, -1, 4] );
		const elemB = new ElemConfig( [0, 0, -1, 3] );
		expect( ElemConfig.OR( elemA, elemB ).toNumArray() ).toEqual( [255, 0, -1, 7] );
	} );

	test( 'Binary operators: XOR', () => {
		const elemA = new ElemConfig( [255, 0, -1, 10] );
		const elemB = new ElemConfig( [0, 0, -1, 12] );
		expect( ElemConfig.XOR( elemA, elemB ).toNumArray() ).toEqual( [255, 0, 0, 6] );
	} );

	test( 'converting configuration to array with indexes of 1', () => {
		const elem = new ElemConfig( [-1, -1, -1, -1] );
		expect( elem.asIndexes() ).toHaveLength( CHEMICAL_ELEM_NUM );
	} );







	let firstSpinArray: SpinState[] = [
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,

		1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,
		
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		
		1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,

		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
	];

	test( 'check the construction of the Configuration by the long array of spins', () => {
		const expectedArray = firstSpinArray.slice( SpinIndex.MIN, SpinIndex.MAX + 1 );
		expect( ElemConfig.createFromSpinArray( firstSpinArray ).toArray() ).toEqual( expectedArray );
		firstSpinArray = expectedArray;
	});

	test( 'check the construction of the Configuration by the normal array of spins', () => {
		expect( ElemConfig.createFromSpinArray( firstSpinArray ).toArray() ).toEqual( firstSpinArray );
	});

	test( 'check the construction of the Configuration by the short array of spins', () => {
		firstSpinArray = firstSpinArray.slice( SpinIndex.MIN, 32 );
		const configFromArray = ElemConfig.createFromSpinArray( firstSpinArray );
		expect( configFromArray.isEqual( new ElemConfig() ) ).toBeTruthy();
	});

	test( 'test method getDiagramFullState', () => {
		const diagram = new ElemConfig( [0, 0, -1, -1] );
		const shots = new ElemConfig( [0, -1, 0, -1] );
		const diagramState = ElemConfig.getDiagramFullState( diagram, shots );
		
		expect( diagramState[31] ).toBe( EDiagramCellState.off );
		expect( diagramState[63] ).toBe( EDiagramCellState.miss );
		expect( diagramState[95] ).toBe( EDiagramCellState.on );
		expect( diagramState[117] ).toBe( EDiagramCellState.hit );
	});

	test( 'test method getShotResults', () => {
		const diagram = new ElemConfig( [0, 0, -1, -1] );
		const shots = new ElemConfig( [0, -1, 0, -1] );
		const diagramState = ElemConfig.getShotResults( diagram, shots );
		
		expect( diagramState[31] ).toBe( EDiagramCellState.off );
		expect( diagramState[63] ).toBe( EDiagramCellState.miss );
		expect( diagramState[95] ).toBe( EDiagramCellState.off );
		expect( diagramState[117] ).toBe( EDiagramCellState.hit );
	});
});