export type OrbitalStr = 's' | 'p' | 'd' | 'f';

/** Набор из 4х квантовых чисел
 * * n: [1; 7]
 * * l: [0; 3]
 * * m: [-3; 3]
 * * s: -1 | 1
 */
export type QuantumNumbers = {
	n?: MainQN,
	l?: OrbitalQN,
	m?: MagneticQN,
	s?: SpinQN,
};

export type CellQN = {
	n: MainQN,
	l: OrbitalQN,
	m: MagneticQN,
	s: SpinQN,
};

export type BoxQN = {
	n: MainQN,
	l: OrbitalQN,
	m: MagneticQN,
};

export type BlockQN = {
	n: MainQN,
	l: OrbitalQN,
};

export type QNStringScheme = [string, string, string, string];

export type { default as IQuantumNumber, QNStrType } from './QuantumNumberInterface.d';