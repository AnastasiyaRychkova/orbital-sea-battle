import {
	CellQN,
	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,
} from "../../lib/game/ChemicalElement/QuantumNumbers";

const tasks: CellQN[][] = [
	// ----------  Task 1  ------------------
	[
		{
			n: new MainQN( 5 ),
			l: new OrbitalQN( 'f' ),
			m: new MagneticQN( 3 ),
			s: new SpinQN( 1 )
		},
		{
			n: new MainQN( 2 ),
			l: new OrbitalQN( 'p' ),
			m: new MagneticQN( -1 ),
			s: new SpinQN( 1 )
		},
		{
			n: new MainQN( 3 ),
			l: new OrbitalQN( 's' ),
			m: new MagneticQN( 0 ),
			s: new SpinQN( -1 )
		},
		{
			n: new MainQN( 6 ),
			l: new OrbitalQN( 'd' ),
			m: new MagneticQN( 2 ),
			s: new SpinQN( -1 )
		},
		{
			n: new MainQN( 7 ),
			l: new OrbitalQN( 'p' ),
			m: new MagneticQN( 1 ),
			s: new SpinQN( -1 )
		},
		{
			n: new MainQN( 4 ),
			l: new OrbitalQN( 'p' ),
			m: new MagneticQN( 0 ),
			s: new SpinQN( 1 )
		},
	],
	// ----------  Task 2  ------------------
	[
		{
			n: new MainQN( 3 ),
			l: new OrbitalQN( 'd' ),
			m: new MagneticQN( -1 ),
			s: new SpinQN( -1 )
		},
		{
			n: new MainQN( 6 ),
			l: new OrbitalQN( 'p' ),
			m: new MagneticQN( -1 ),
			s: new SpinQN( -1 )
		},
		{
			n: new MainQN( 5 ),
			l: new OrbitalQN( 'f' ),
			m: new MagneticQN( -2 ),
			s: new SpinQN( 1 )
		},
		{
			n: new MainQN( 3 ),
			l: new OrbitalQN( 's' ),
			m: new MagneticQN( 0 ),
			s: new SpinQN( -1 )
		},
		{
			n: new MainQN( 3 ),
			l: new OrbitalQN( 'p' ),
			m: new MagneticQN( 0 ),
			s: new SpinQN( 1 )
		},
		/* {
			n: new MainQN( 5 ),
			l: new OrbitalQN( 'd' ),
			m: new MagneticQN( -2 ),
			s: new SpinQN( 1 )
		}, */
	],
];

export default tasks;