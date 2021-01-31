import { EDiagramCellState } from "../ChemicalElement/DiagramCell";

export default interface DiagramStateType
{
	getCellState( index: number ): EDiagramCellState
	isLastShot( index: number ): boolean
	isCellSelected( index: number ): boolean
	isContainerSelected( firstCellIndex: number ): boolean
	isShipSelected( name: string ): boolean
	getShipPropsByName( name: string ): {
		firstCellIndex: number,
		length: number,
	}

	cellClickFunction?: ( index: number ) => void
	shipNameClickFunction?: ( name: string ) => void
}