import periodicTable, { ChemicalElement } from '../ChemicalElement/PeriodicTable';
import { default as QN } from '../ChemicalElement/qnModule';
import ElemConfig from '../ChemicalElement/ElemConfig';
import type { BlockQN, CellQN } from '../ChemicalElement/QuantumNumbers';
import type {} from '../ChemicalElement/ElemConfig';
import { CellIndex } from '../ChemicalElement/DiagramCell';

type BlockDescription = {n: 1|2|3|4|5|6|7, l: 's'|'p'|'d'|'f'};
type CellDescription = BlockDescription & {m: -3|-2|-1|0|1|2|3, s: -1|1};

export default {
	isElemNumberValid( elemNumber: number ): boolean
	{
		return elemNumber > 0 && elemNumber <= periodicTable.MAX_ELEM_NUMBER
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

	cellIndex( index: number ): CellIndex
	{
		return new CellIndex( index );
	},

	toIndex( cell: CellQN ): number
	{
		return periodicTable.converter.toIndex( cell )?.value || 0;
	},

	toCell( index: number | CellIndex ): CellQN | undefined
	{
		return periodicTable.converter.toQN(
			index instanceof CellIndex
				? index.value
				: new CellIndex( index ).value
		);
	},

	isCellValid( cell: CellQN ): boolean
	{
		return periodicTable.converter.toIndex( cell ) !== undefined;
	}
}

export {
	periodicTable,
	QN,
	ElemConfig,
	CellIndex,
};

export type {
	ChemicalElement,
};


export type {
	OrbitalStr,
	QNStringScheme,

	QuantumNumbers,
	BlockQN,
	BoxQN,
	CellQN,

	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,

} from "../ChemicalElement/QuantumNumbers";

export type { default as IQuantumNumber, QNStrType } from '../ChemicalElement/QuantumNumberInterface';