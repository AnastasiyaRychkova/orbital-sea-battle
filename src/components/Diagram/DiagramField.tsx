import React from 'react';
import { observer } from 'mobx-react';
import Ship from './Ship';
import {MainQN, OrbitalQN} from '../../lib/game/ChemicalElement/QuantumNumbers';


const DiagramField = observer(() => {
	return (
		<g>
			<Ship qn={{
					n: new MainQN( 1 ),
					l: new OrbitalQN( 's' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 2 ),
					l: new OrbitalQN( 's' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 2 ),
					l: new OrbitalQN( 'p' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 3 ),
					l: new OrbitalQN( 's' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 3 ),
					l: new OrbitalQN( 'p' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 3 ),
					l: new OrbitalQN( 'd' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 4 ),
					l: new OrbitalQN( 's' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 4 ),
					l: new OrbitalQN( 'p' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 4 ),
					l: new OrbitalQN( 'd' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 4 ),
					l: new OrbitalQN( 'f' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 5 ),
					l: new OrbitalQN( 's' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 5 ),
					l: new OrbitalQN( 'p' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 5 ),
					l: new OrbitalQN( 'd' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 5 ),
					l: new OrbitalQN( 'f' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 6 ),
					l: new OrbitalQN( 's' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 6 ),
					l: new OrbitalQN( 'p' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 6 ),
					l: new OrbitalQN( 'd' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 7 ),
					l: new OrbitalQN( 's' ),
				}}
			/>
			<Ship qn={{
					n: new MainQN( 7 ),
					l: new OrbitalQN( 'p' ),
				}}
			/>
		</g>
	);
});

export default DiagramField;