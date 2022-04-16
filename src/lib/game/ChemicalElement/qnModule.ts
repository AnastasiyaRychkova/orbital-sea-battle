import MainQN from "./MainQN"
import OrbitalQN from "./OrbitalQN";
import MagneticQN from "./MagneticQN";
import SpinQN from "./SpinQN";
import { stringSchemeToQuantumNumbers } from "./QuantumNumbers";

export type { default as IQuantumNumber, QNStrType } from "./QuantumNumberInterface";


export default {
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