import entities from '../OB_EntitiesFabric';
import Aliases from '../../Aliases';
import Chemistry from '../../Chemistry';
import type { EventData } from '../../../util/types';

describe( 'LocalPlayer', () => {
	const userInitObj = {
		name: 'John',
		alias: Aliases.random(),
	};

	test( 'selecting element', () => {
		const user = entities.user( entities.profile(userInitObj) );
		const player = entities.localPlayer( user );
		let receivedElementNumber: number = -1;
		player.once(
			'selection',
			( { detail }: EventData<object> ) => {
				receivedElementNumber = (detail as any).elementNumber
			}
		);

		player.selectElement( 14 );

		expect( player.selectedElement?.number ).toBe( 14 );
		expect( receivedElementNumber ).toBe( 14 );
	} );

	test( 'attempt to select element with invalid number throws error', () => {
		const user = entities.user( entities.profile(userInitObj) );
		const player = entities.localPlayer( user );

		expect( () => player.selectElement( -1 ) ).toThrow();
	} );
} );

describe( 'diagram filling throw player', () => {
	const user = entities.user( entities.profile({
		name: 'John',
	}) );
	const player = entities.localPlayer( user );
	const diagram = entities.diagram();


	test( 'operations on the diagram without its initialization throw errors', () => {
		expect( () => player.toggleBlock( Chemistry.block( {n: 1, l: 's'} ) ) ).toThrow();
		expect( () => player.toggleCell( Chemistry.cell( {n: 1, l: 's', m: 0, s: 1} ) ) ).toThrow();
	} );

	test( 'operations on the diagram do not throw errors after initialization', () => {
		player.setDiagram( diagram );

		expect( () => player.toggleBlock( Chemistry.block( {n: 1, l: 's'} ) ) ).not.toThrow();
		expect( () => player.toggleCell( Chemistry.cell( {n: 1, l: 's', m: 0, s: 1} ) ) ).not.toThrow();
	} );

	test( 'checking diagram filling', () => {
		diagram.reset();
		player.selectElement( 6 );
		player.toggleBlock( Chemistry.block( {n: 1, l: 's'} ) );
		player.toggleBlock( Chemistry.block( {n: 2, l: 's'} ) );
		player.toggleCell( Chemistry.cell( {n: 2, l: 'p', m: 1, s: 1} ) );
		player.toggleCell( Chemistry.cell( {n: 2, l: 'p', m: 0, s: 1} ) );

		expect( player.diagramFilledOutCorrectly() ).toBeTruthy();
	} );

	test( 'mark enemy shot', () => {
		const cellQN = Chemistry.cell( {n: 2, l: 'p', m: 1, s: 1} );
		
		expect( player.markEnemyShot( cellQN ) ).toBeTruthy();
		expect( diagram.observableState.isDamaged( cellQN ) ).toBeTruthy();
	} );

	test( 'asking selected element', () => {
		player.selectElement( 6 );
		expect( player.isThisElementSelected( 5 ) ).toBeFalsy();
		expect( player.isThisElementSelected( 6 ) ).toBeTruthy();
	} );
} )