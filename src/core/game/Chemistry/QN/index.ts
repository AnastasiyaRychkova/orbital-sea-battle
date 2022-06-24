import MainQN from "./MainQN"
import OrbitalQN from "./OrbitalQN";
import MagneticQN from "./MagneticQN";
import SpinQN from "./SpinQN";
import { QNStringScheme, QuantumNumbers } from './types';
export type { default as IQuantumNumber, QNStrType } from "./QuantumNumberInterface";

function stringSchemeToQuantumNumbers( scheme: QNStringScheme ): QuantumNumbers
{
	return {
		n: scheme[0] ? new MainQN( parseInt( scheme[0] ) ) : undefined,
		l: scheme[1] ? new OrbitalQN( scheme[1] ) : undefined,
		m: scheme[2] ? new MagneticQN( parseInt( scheme[2] ) ) : undefined,
		s: scheme[3] ? new SpinQN( scheme[3] ) : undefined,
	}
}


const QN = {
	n( value: number|MainQN = MainQN.MIN ): MainQN {
		return new MainQN( value );
	},

	l( symbol: string|number|OrbitalQN = 's' ): OrbitalQN {
		return new OrbitalQN( symbol );
	},

	m( value: number|MagneticQN = 0 ): MagneticQN {
		return new MagneticQN( value );
	},

	s( value: number|string = 1 ): SpinQN {
		return new SpinQN( value );
	},

	qClass: {
		n: MainQN,
		l: OrbitalQN,
		m: MagneticQN,
		s: SpinQN,
	},

	strSchemeToQN: stringSchemeToQuantumNumbers,
};

export default QN;

export {
	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,
};