import type IDiagram from "../Diagram/DiagramInterface";

interface OB_IPlayer
{
	/** Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	selectedElement: number;

	selectElement( elemNumber: number ): void

	setDiagram( diagram: IDiagram): void

	// fireShot( cell: CellQN ): void

	isThisElementSelected( elemNumber: number ): boolean
}


export default OB_IPlayer;