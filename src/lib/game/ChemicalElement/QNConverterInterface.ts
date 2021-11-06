import { SpinIndex } from "./DiagramCell";
import { CellQN, ShipQN } from "./QuantumNumbers";

interface QNConverterInterface
{
	getCellIndex( quantumNumbers: CellQN ): SpinIndex | undefined;
	getBlockIndexes( quantumNumbers: ShipQN ): SpinIndex[] | undefined;
}


export default QNConverterInterface;