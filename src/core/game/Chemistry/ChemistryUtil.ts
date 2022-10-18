import QN from "./QN";
import periodicTable from "./PeriodicTable";
import ElemConfig from "./ElemConfig";
import SpinIndex from "./SpinIndex";
import type { BlockQN, CellQN } from './QN/types';
import type { BlockDescription, CellDescription } from "./types";


const ChemistryUtil = {
	isElemNumberValid( elemNumber: number ): boolean
	{
		return elemNumber > 0 && elemNumber <= periodicTable.MAX_NUMBER
	},
	
	block( scheme: BlockDescription ): BlockQN
	{
		return {
			n: QN.n( scheme.n ),
			l: QN.l( scheme.l ),
		};
	},

	cell( scheme: CellDescription ): CellQN
	{
		return {
			n: QN.n( scheme.n ),
			l: QN.l( scheme.l ),
			m: QN.m( scheme.m ),
			s: QN.s( scheme.s ),
		}
	},

	config( buf?: Int32Array | number[] ): ElemConfig
	{
		return new ElemConfig( buf );
	},

	spinIndex( index: number ): SpinIndex
	{
		return new SpinIndex( index );
	},

	toIndex( cell: CellQN ): number
	{
		return periodicTable.converter.toIndex( cell )?.value || 0;
	},

	toCell( index: number | SpinIndex ): CellQN | undefined
	{
		return periodicTable.converter.toQN(
			index instanceof SpinIndex
				? index.value
				: new SpinIndex( index ).value
		);
	},

	isCellValid( cell: CellQN ): boolean
	{
		return periodicTable.converter.toIndex( cell ) !== undefined;
	}
}

export default ChemistryUtil;