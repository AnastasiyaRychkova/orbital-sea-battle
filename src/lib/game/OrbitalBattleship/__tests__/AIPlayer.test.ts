import Chemistry from "../../Services/Chemistry";
import AIPLayer from "../OB_AIPLayer";
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
	const player = entities.aiPlayer( {user, game, analyzer, enemyAnalyzer} ) as AIPLayer;



	test( 'element selection when game state become Choice', () => {
		jest.useFakeTimers();
		game.send( 'start' );
		expect( player.hasSelectedElement ).toBeFalsy();
		expect( player._state ).toBe( 'selecting' );

		jest.runAllTimers();
		expect( player._state ).toBe( 'waiting' );
		expect( player.hasSelectedElement ).toBeTruthy();
	} );

	test( 'filling out the diagram', () => {
		jest.useFakeTimers();
		game.send( 'selected' );
		game.send( 'start' );

		expect( game.state ).toBe( 'diagram' );
		expect( player.hasFilled ).toBeFalsy();
		expect( player._state ).toBe( 'filling' );

		jest.runAllTimers();

		expect( player._state ).toBe( 'waiting' );
		expect( player.hasFilled ).toBeTruthy();
	} );

	test( 'mark player shot', () => {
		game.send( 'ready' );
		player.setDiagram( diagram );
		game.send( 'ready' );

		const cellQN = Chemistry.cell( {n: 5, l: 'd', m: 2, s: 1} );
		player.markEnemyShot( cellQN ).then( (result: boolean ) => {
			expect( diagram.hasSpin( cellQN ) ).toBe( result );
			expect( diagram.observableState.isDamaged( cellQN ) ).toBeTruthy();
		} );
	} );

} );