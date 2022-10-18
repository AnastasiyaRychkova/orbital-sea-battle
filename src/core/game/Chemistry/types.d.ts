import type { OrbitalStr } from "./QN/types.d";

export type N1to7 = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type M3to_3 = 3 | 2 | 1 | 0 | -1 | -2 | -3;
export type S1or_1 = -1 | 1;

export type BlockDescription = {
	n: N1to7,
	l: OrbitalStr,
};

export type CellDescription = {
	m: M3to_3,
	s: S1or_1,
} & BlockDescription;



export * from './QN/types.d';
export * from './ChemicalElement.d';