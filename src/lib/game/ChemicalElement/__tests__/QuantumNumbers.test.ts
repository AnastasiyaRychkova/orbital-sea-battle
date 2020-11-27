import MainQN from "../MainQN";
import OrbitalQN from "../OrbitalQN";
import MagneticQN from "../MagneticQN";

let QNClass: typeof MainQN | typeof OrbitalQN | typeof MagneticQN;

const classTestFunction = () => {
	test( 'check value in range', () => {
		const testedNumber: number = QNClass.MAX;
		expect( new QNClass( testedNumber ).value ).toEqual( testedNumber );
	});

	test( 'check value out of range (+)', () => {
		const testedNumber: number = QNClass.MAX + 10;
		expect( new QNClass( testedNumber ).value ).toEqual( QNClass.MAX );
	});

	test( 'check value out of range (-)', () => {
		const testedNumber: number = QNClass.MIN - 10;
		expect( new QNClass( testedNumber ).value ).toEqual( QNClass.MIN );
	});

	test( 'check not integer value', () => {
		const testedNumber: number = 1.6;
		const expectedNumber: number = 2;
		expect( new QNClass( testedNumber ).value ).toEqual( expectedNumber );
	});

	test( 'check number assignment', () => {
		const testedObject = new QNClass( QNClass.MAX );
		testedObject.value = QNClass.MIN;
		expect( testedObject.value ).toBe( QNClass.MIN );
	});

	test( 'check QuantumNumber assignment of the same class', () => {
		const testedObject = new QNClass( QNClass.MIN );
		testedObject.assign( new QNClass( QNClass.MAX ) );
		expect( testedObject.value ).toEqual( QNClass.MAX );
	});
};

QNClass = MainQN;
describe( 'MainQN', classTestFunction );

QNClass = OrbitalQN;
describe( 'OrbitalQN', classTestFunction );

QNClass = MagneticQN;
describe( 'MagneticQN', classTestFunction );
