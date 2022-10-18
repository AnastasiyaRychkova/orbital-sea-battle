import Chemistry, { periodicTable } from "../../Chemistry";
import DiagramState from "../DObjectState";

describe( 'Diagram state without filter or highlight layout', () => {
	const diagram = new DiagramState();

	test( 'composition check', () => {
		const columns = Object.values( diagram.children );
		expect( columns ).toHaveLength( 7 );

		const blocksInFirstColumn = Object.values( diagram.getColumn( '1' )!.children );
		expect( blocksInFirstColumn ).toHaveLength( 1 );

		const blocksInLastColumn = Object.values( diagram.getColumn( '7' )!.children );
		expect( blocksInLastColumn ).toHaveLength( 2 );

		const boxesInLongestBlock = Object.values( diagram.getColumn( '4' )!.getBlock( 'f' )!.children );
		expect( boxesInLongestBlock ).toHaveLength( 7 );

		const boxesInShortestBlock = Object.values( diagram.getColumn( '6' )!.getBlock( 's' )!.children );
		expect( boxesInShortestBlock ).toHaveLength( 1 );
	} );

	test( 'setting cell state (selected or not)', () => {
		const cellQN = Chemistry.cell( {n: 7, l: 'p', m: -1, s: -1} );

		diagram.write( cellQN, true );
		expect( diagram.hasSpin( cellQN ) ).toBeTruthy();

		diagram.write( cellQN, false );
		expect( diagram.hasSpin( cellQN ) ).toBeFalsy();
	} );

	test( 'toggle single cell', () => {
		const cellQN = Chemistry.cell( {n: 3, l: 'd', m: -1, s: 1} );
		const cell = diagram.getCell( cellQN );
		expect( cell ).not.toBeUndefined();

		diagram.toggleCell( cellQN );

		expect( diagram.hasSpin( cellQN ) ).toBeTruthy();
		diagram.toggleCell( cellQN );
		expect( diagram.hasSpin( cellQN ) ).toBeFalsy();
	} );

	test( 'toggle block with single box from empty state', () => {
		const blockQN = Chemistry.block( {n: 3, l: 's'} );
		const block = diagram.getBlock( blockQN );

		expect( block ).not.toBeUndefined();

		diagram.toggleBlock( blockQN );

		expect( diagram.hasSpin( Chemistry.cell( {n: 3, l: 's', m: 0, s: -1 } ) ) ).toBeTruthy();
		expect( block!.selectedCellsNum ).toBe( 2 );

		diagram.toggleBlock( blockQN );

		expect( diagram.hasSpin( Chemistry.cell( {n: 3, l: 's', m: 0, s: -1 } ) ) ).toBeFalsy();
		expect( diagram.hasSpin( Chemistry.cell( {n: 3, l: 's', m: 0, s: 1 } ) ) ).toBeFalsy();
		expect( block!.selectedCellsNum ).toBe( 0 );
	} );

	test( 'toggle block with multiple boxes from empty state', () => {
		const blockQN = Chemistry.block( {n: 4, l: 'f'} );
		const block = diagram.getBlock( blockQN );
		expect( block ).not.toBeUndefined();

		block!.toggle();
		expect( block!.selectedCellsNum ).toBe( 7 * 2 );

		block!.toggle();
		expect( block?.selectedCellsNum ).toBe( 0 );
	} );

	test( 'toggle partially filled block: ▮▯ ▮▯ ▯▯ --> ▮▮ ▮▮ ▮▮ ', () => {
		diagram.getCell( Chemistry.cell( {n: 3, l: 'p', m: 1, s: 1} ) )?.toggle();
		diagram.getCell( Chemistry.cell( {n: 3, l: 'p', m: 0, s: 1} ) )?.toggle();
		const block = diagram.getBlock( Chemistry.block( {n: 3, l: 'p'} ) );
		expect( block?.selectedCellsNum ).toBe( 2 );
		
		block!.toggle();
		expect( block!.selectedCellsNum ).toBe( 6 );

		block!.toggle();
		expect( block!.selectedCellsNum ).toBe( 0 );
	} );

	test( 'doing damage', () => {
		const cellQN = Chemistry.cell( {n: 2, l: 'p', m: 0, s: 1} );
		diagram.doDamage( cellQN );

		expect( diagram.isDamaged( cellQN ) ).toBeTruthy();
		expect( diagram.getCell( cellQN )?.isLastDamaged ).toBeTruthy();
	} );
} );

describe( 'Converting Diagram State in binary element configuration', () => {
	test( 'creating config object from state object', () => {
		const diagram = new DiagramState();
		diagram.toggleBlock( Chemistry.block( {n: 1, l: 's'} ) );
		diagram.toggleBlock( Chemistry.block( {n: 2, l: 's'} ) );

		expect( diagram.asConfig().isEqual( periodicTable.element( 4 ).config ) ).toBeTruthy();
	} );
} )