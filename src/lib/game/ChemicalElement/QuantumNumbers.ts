import MainQN from "./MainQN";
import OrbitalQN from "./OrbitalQN";
import MagneticQN from "./MagneticQN";
import SpinQN from "./SpinQN";


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

export type ContainerQN = {
	n: MainQN,
	l: OrbitalQN,
	m: MagneticQN,
};

export type ShipQN = {
	n: MainQN,
	l: OrbitalQN,
};

export {
	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,
};