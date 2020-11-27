import QN from "../OrbitalQN";
import type { OrbitalStr } from "../QuantumNumbers";

describe( 'Orbital QN', () => {
	test( 'check string conversion', () => {
		for( let num = QN.MIN; num < QN.MAX; num++ )
			expect( QN.strToNum( QN.LETTERS[ num ] ) ).toEqual( num );
	});

	test( 'check number conversion', () => {
		for( let num = QN.MIN; num < QN.MAX; num++ )
			expect( QN.numToStr( num ) ).toEqual( QN.LETTERS[ num ] );
	});

	test( 'check getter', () => {
		const testedString: OrbitalStr = 'f';
		const testedObject = new QN( testedString );
		expect( testedObject.string ).toEqual( testedString );
	});

	test( 'check setter', () => {
		const testedString: OrbitalStr = 'f';
		const testedObject = new QN();
		testedObject.string = testedString;
		expect( testedObject.string ).toEqual( testedString );
	});
});