import MainQN from "../MainQN";
import OrbitalQN from "../OrbitalQN";
import MagneticQN from "../MagneticQN";
import SpinQN from "../SpinQN";
import QN from "../QNModule";

let QNClass: typeof MainQN | typeof OrbitalQN | typeof MagneticQN | typeof SpinQN;

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

QNClass = SpinQN;
describe( 'SpinQN', classTestFunction );

describe( 'QN rounding', () => {
	test( 'MainQN check not integer value', () => {
		const testedNumber: number = 1.6;
		const expectedNumber: number = 2;
		expect( QN.n( testedNumber ).value ).toEqual( expectedNumber );
	} );

	test( 'OrbitalQN check not integer value', () => {
		const testedNumber: number = 3.6;
		const expectedNumber: number = 3;
		expect( QN.l( testedNumber ).value ).toEqual( expectedNumber );
	} );

	test( 'MagneticQN check not integer value', () => {
		const testedNumber: number = -1.6;
		const expectedNumber: number = -2;
		expect( QN.m( testedNumber ).value ).toEqual( expectedNumber );
	} );

	test( 'SpinQN check not integer value', () => {
		const testedNumber: number = 0;
		const expectedNumber: number = 1;
		expect( QN.s( testedNumber ).value ).toEqual( expectedNumber );
	} );
} )