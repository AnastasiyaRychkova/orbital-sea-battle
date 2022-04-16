import entities from "../../OrbitalBattleship/OB_EntitiesFabric";
import Chemistry, { periodicTable } from "../../Services/Chemistry";

describe( 'Diagram without filter and highlight layout', () => {
	const diagram = entities.diagram();

	test( 'toggle cell', () => {
		const cellQN = Chemistry.cell( {n: 3, l: 'd', m: 2, s: 1} );
		expect( diagram.observableState.hasSpin( cellQN ) ).toBeFalsy();

		expect( diagram.toggleCell( cellQN ) ).toBeTruthy();
	} );

	test( 'toggle block', () => {
		const blockQN = Chemistry.block( {n: 3, l: 'd'} );
		expect( diagram.observableState.getBlock( blockQN ).isFilled ).toBeFalsy();

		expect( diagram.toggleBlock( blockQN ) ).toBeTruthy();

		expect( diagram.observableState.getBlock( blockQN ).isFilled ).toBeTruthy();
	} );

	test( 'listening shot event', () => {
		const cellQN = Chemistry.cell( {n: 3, l: 'd', m: 2, s: 1} );
		let listenerFlag: boolean = false;
		diagram.once( 'shot', () => {listenerFlag = true;} )
		diagram.fire( cellQN );

		expect( listenerFlag ).toBeTruthy();
	} );

	test( 'reshot is not available', () => {
		const cellQN = Chemistry.cell( {n: 3, l: 'd', m: 2, s: 1} );
		let listenerFlag: boolean = false;
		const listener = () => {listenerFlag = true;};
		diagram.once( 'shot', listener );

		diagram.fire( cellQN );

		expect( listenerFlag ).toBeFalsy();

		diagram.remove( 'shot', listener );
	} );

	test( 'testing asking spin method', () => {
		const cellQN = Chemistry.cell( {n: 5, l: 'd', m: -2, s: -1} );

		expect( diagram.hasSpin( cellQN ) ).toBeFalsy();
		
		diagram.toggleCell( cellQN );
		expect( diagram.hasSpin( cellQN ) ).toBeTruthy();
	} );

	test( 'resetting diagram', () => {
		diagram.reset();
		expect( diagram.isEqual( Chemistry.config() ) ).toBeTruthy();
	} );

	test( 'compering diagram state with chemical element configuration', () => {
		diagram.toggleBlock( Chemistry.block( {n: 1, l: 's'} ) );
		diagram.toggleBlock( Chemistry.block( {n: 2, l: 's'} ) );

		expect( diagram.isEqual( periodicTable.element( 4 ).config ) ).toBeTruthy();
	} );

	test( 'setting diagram state from element configuration object', () => {
		const pt78 = periodicTable.element( 78 ).config
		diagram.setState( pt78 );
		expect( diagram.isEqual( pt78 ) ).toBeTruthy();
	} )
} );


