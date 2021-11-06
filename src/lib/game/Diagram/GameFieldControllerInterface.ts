import { EDiagramCellState as CellState } from "../ChemicalElement/DiagramCell";
import { CellQN } from "../ChemicalElement/QuantumNumbers";
import IFilter from "./Filter/FilterInterface";

interface IGameFieldController
{
	getCellState( quantumNumbers: CellQN ): CellState;

	cellClickFunction: ( quantumNumbers: CellQN ) => void;
	sendFunction: () => void;

	isLastShot( quantumNumbers: CellQN ): boolean;

	filter: IFilter;
}


export default IGameFieldController;