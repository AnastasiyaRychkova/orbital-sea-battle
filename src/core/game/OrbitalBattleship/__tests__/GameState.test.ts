import Chemistry from "../../Services/Chemistry";
import entities from "../OB_EntitiesFabric";
import GameState from "../entities/OB_GameState";
import type { EventData } from '../../../util/EventEmitter/types.d';
import type { PlayerEventData } from "../types";
import type { OB_ILocalPlayerController } from "../OB_Entities";

describe( 'Game State', () => {
	const user = entities.user( { name: 'Max' } );
	const player = entities.localPlayer( user );
	const playerDiagram = entities.diagram();
	const enemy = entities.aiPlayer( user );
	const enemyDiagram = entities.diagram();
	const game = new GameState( player, enemy );
	const controller = entities.localPlayerController( game );
	const ai = entities.aiPlayerBehaviour( game );
	const SELECTED_ELEMENT_Cu29 = 29;
	const SELECTED_ELEMENT_Nb41 = 41;

	// preparing.selecting.instruction ---(instruction.start)--> preparing.selecting.choice
	test( 'starting', () => {
		controller.completeOnBoarding();
		expect( game.state ).toBe( 'choice' );
		expect( player.hasSelectedElement ).toBeFalsy();
		expect( enemy.hasSelectedElement ).toBeFalsy();
	} );

	// preparing.selecting.choice ---(selecting.select)--> preparing.filling.instruction
	test( 'selecting', () => {
		let receivedElement: number = 0;
		const selectionListener = ( data: EventData<PlayerEventData> ) => {
			receivedElement = data.detail.elementNumber
		};
		player.once( 'selection', selectionListener );

		controller.selectElement( SELECTED_ELEMENT_Nb41 );

		expect( receivedElement ).toBe( SELECTED_ELEMENT_Nb41 );
		expect( player.isThisElementSelected( SELECTED_ELEMENT_Nb41 ) ).toBeTruthy();
		expect( player.hasSelectedElement ).toBeTruthy();
	} );

	// preparing.filling.instruction ---(filling.start)--> preparing.filling.diagram
	test( 'going to diagram filling after onboarding', () => {
		expect( game.state ).toBe( 'instruction' );
		controller.completeOnBoarding();
		expect( game.state ).toBe( 'diagram' );
	} );

	test( 'in diagram filling game state Enemy select element automatically', () => {
		expect( game.state ).toBe( 'diagram' );
		expect( enemy.hasSelectedElement ).toBeTruthy();
	} );

	// preparing.filling.diagram ---(filling.fail)--> preparing.filling.fail
	test( 'incorrect filling', () => {
		jest.useFakeTimers();
		game.player.setDiagram( playerDiagram );
		fillDiagram_Cu29( controller );
		controller.checkDiagram();

		expect( game.state ).toBe( 'fail' );
	} );

	// preparing.filling.fail ---[t]--> preparing.filling.diagram
	test( 'returning to digram editing after delay', () => {
		jest.runAllTimers();
		expect( game.state ).toBe( 'diagram' );
	} );

	// preparing.filling.diagram ---(filling.change)--> preparing.selecting.instruction ---[t0]--> preparing.selecting.choice
	test( 'selecting another element', () => {
		jest.useFakeTimers();
		controller.cancelElementSelection();
		jest.runAllTimers();
		expect( game.state ).toBe( 'choice' );
	} );

	test( 'selecting another element', () => {
		jest.useFakeTimers();
		controller.selectElement( SELECTED_ELEMENT_Cu29 );
		expect( player.isThisElementSelected( SELECTED_ELEMENT_Cu29 ) ).toBeTruthy();
	} );

	// preparing.selecting.choice ---(selecting.select)--> preparing.filling.instruction ---[t0]--> preparing.filling.diagram
	test( 'onboarding is skipped after element reselection', () => {
		jest.runAllTimers();
		expect( game.state ).toBe( 'diagram' );
	} );

	test( 'diagram is cleared after element reselection', () => {
		expect( game.player.diagram?.isEqual( Chemistry.config() ) ).toBeTruthy();
	} );

	test( 'diagram is NOT cleared without element reselection', () => {
		jest.useFakeTimers();
		fillDiagram_Cu29( controller );
		controller.cancelElementSelection();
		jest.runAllTimers();

		expect( game.state ).toBe( 'choice' );

		controller.selectElement( SELECTED_ELEMENT_Cu29 );
		jest.runAllTimers();

		expect( game.state ).toBe( 'diagram' );
		expect( playerDiagram.isEqual( Chemistry.config() ) ).toBeFalsy();
	} );

	test( 'diagram checking', () => {
		jest.useFakeTimers();
		controller.checkDiagram();

		expect( game.state ).toBe( 'correct' );
		jest.runAllTimers();
		expect( game.state ).toBe( 'waiting' );
		// expect( enemy.hasFilled ).toBeTruthy();
	} );





	function fillDiagram_Cu29( controller: OB_ILocalPlayerController )
	{
		controller.toggleBlock( Chemistry.block({ n: 1, l: 's' }) );
		controller.toggleBlock( Chemistry.block({ n: 2, l: 's' }) );
		controller.toggleBlock( Chemistry.block({ n: 2, l: 'p' }) );
		controller.toggleBlock( Chemistry.block({ n: 3, l: 's' }) );
		controller.toggleBlock( Chemistry.block({ n: 3, l: 'p' }) );
		controller.toggleBlock( Chemistry.block({ n: 3, l: 'd' }) );
		controller.toggleCell( Chemistry.cell({ n: 4, l: 's', m: 0, s: 1 }) );
	}
} );