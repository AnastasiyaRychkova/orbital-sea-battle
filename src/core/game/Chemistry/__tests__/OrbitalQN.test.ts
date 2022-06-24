import QN from "../QN";
import type { OrbitalStr } from "../QN/QuantumNumbers";

describe( 'Orbital QN', () => {
	test( 'check string conversion', () => {
		for( let num = QN.qClass.l.MIN; num < QN.qClass.l.MIN; num++ )
			expect( QN.qClass.l.strToNum( QN.qClass.l.LETTERS[ num ] ) ).toEqual( num );
	});

	test( 'check number conversion', () => {
		for( let num = QN.qClass.l.MIN; num < QN.qClass.l.MAX; num++ )
			expect( QN.qClass.l.numToStr( num ) ).toEqual( QN.qClass.l.LETTERS[ num ] );
	});

	test( 'check getter', () => {
		const testedString: OrbitalStr = 'f';
		const testedObject = QN.l( testedString );
		expect( testedObject.toString() ).toEqual( testedString );
	});

	test( 'check assign function', () => {
		const testedString: OrbitalStr = 'f';
		const testedObject = QN.l();
		testedObject.assign( QN.l( testedString ) );
		expect( testedObject.toString() ).toEqual( testedString );
	});
});