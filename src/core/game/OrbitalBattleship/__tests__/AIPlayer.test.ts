import Chemistry from "../../Services/Chemistry";
import OB_AIPLayer from "../OB_AIPLayer";
import entities from "../OB_EntitiesFabric"
import GameState from "../OB_GameState";

describe( 'AI Player', () => {
	const user = entities.user( {
		name: 'John',
	} );
	const game = new GameState();
	const diagram = entities.diagram();
	const analyzer = entities.shotsAnalyzer();
	const enemyAnalyzer = entities.shotsAnalyzer();
	const player = entities.aiPlayer( {user, analyzer} ) as OB_AIPLayer;
	const ai = entities.aiPlayerBehaviour( {player, game, analyzer, enemyAnalyzer} );

	const randomFunc = Math.random;



	test( 'element selection when game state become Choice', () => {
		jest.useFakeTimers();
		game.send( 'start' );
		expect( ai.hasSelectedElement ).toBeFalsy();
		expect( player.hasSelectedElement ).toBeFalsy();
		expect( ai._state ).toBe( 'selecting' );

		jest.runAllTimers();
		expect( ai._state ).toBe( 'waiting' );
		expect( ai.hasSelectedElement ).toBeTruthy();
		expect( player.hasSelectedElement ).toBeTruthy();
	} );

	test( 'filling out the diagram', () => {
		jest.useFakeTimers();
		game.send( 'selected' );
		game.send( 'start' );

		expect( game.state ).toBe( 'diagram' );
		expect( player.hasFilled ).toBeFalsy();
		expect( ai._state ).toBe( 'filling' );

		jest.runAllTimers();

		expect( ai._state ).toBe( 'waiting' );
		expect( player.hasFilled ).toBeTruthy();
	} );

	test( 'mark player shot', () => {
		game.send( 'ready' );
		ai.setDiagram( diagram );
		game.send( 'ready' );

		const cellQN = Chemistry.cell( {n: 5, l: 'd', m: 2, s: 1} );
		player.markEnemyShot( cellQN ).then( (result: boolean ) => {
			expect( diagram.hasSpin( cellQN ) ).toBe( result );
			expect( diagram.observableState.isDamaged( cellQN ) ).toBeTruthy();
		} );
	} );

/* 	test( 'making a shot', () => {
		jest.useFakeTimers();
		Math.random = () => 1;
		game.send( 'enemy_turn' );
		jest.runAllTimers();

	} ); */

} );