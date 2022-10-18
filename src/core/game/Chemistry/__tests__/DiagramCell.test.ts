import { calcCellState, EDiagramCellState as CellState } from "../DiagramCell";

test( 'testing the DiagramCellState and calculation function', () => {
	expect( calcCellState( 0, 0 ) ).toBe( CellState.off );
	expect( calcCellState( 1, 0 ) ).toBe( CellState.on );
	expect( calcCellState( 1, 1 ) ).toBe( CellState.hit );
	expect( calcCellState( 0, 1 ) ).toEqual( CellState.miss );
});