import Chemistry from "../../Services/Chemistry";
import OB_AIPLayer from "../OB_AIPLayer";
import entities from "../OB_EntitiesFabric"
import GameState from "../OB_GameState";

describe( 'AI Player', () => {
	const user = entities.user( {
		name: 'John',
	} );
	const playerDiagram = entities.diagram();
	const enemyDiagram = entities.diagram();
	const analyzer = entities.shotsAnalyzer();
	const enemyAnalyzer = entities.shotsAnalyzer();
	const player = entities.localPlayer( user );
	const enemy = entities.aiPlayer( {user, analyzer} ) as OB_AIPLayer;
	const game = new GameState( player, enemy );
	const ai = entities.aiPlayerBehaviour( {player: enemy, game, analyzer, enemyAnalyzer} );

	const randomFunc = Math.random;


	player.setDiagram( playerDiagram );


	test( 'element selection when game state become Choice', () => {
		jest.useFakeTimers();
		game.send( 'start' );
		expect( ai.hasSelectedElement ).toBeFalsy();
		expect( enemy.hasSelectedElement ).toBeFalsy();
		expect( ai._state ).toBe( 'selecting' );

		jest.runAllTimers();
		expect( ai._state ).toBe( 'waiting' );
		expect( ai.hasSelectedElement ).toBeTruthy();
		expect( enemy.hasSelectedElement ).toBeTruthy();
	} );

	test( 'filling out the diagram', () => {
		jest.useFakeTimers();
		game.send( 'selected' );
		game.send( 'start' );

		expect( game.state ).toBe( 'diagram' );
		expect( enemy.hasFilled ).toBeFalsy();
		expect( ai._state ).toBe( 'filling' );

		jest.runAllTimers();

		expect( ai._state ).toBe( 'waiting' );
		expect( enemy.hasFilled ).toBeTruthy();
	} );

	test( 'mark player shot', () => {
		game.send( 'ready' );
		ai.setDiagram( enemyDiagram );
		game.send( 'ready' );

		const cellQN = Chemistry.cell( {n: 5, l: 'd', m: 2, s: 1} );
		enemy.markEnemyShot( cellQN ).then( (result: boolean ) => {
			expect( enemyDiagram.hasSpin( cellQN ) ).toBe( result );
			expect( enemyDiagram.observableState.isDamaged( cellQN ) ).toBeTruthy();
		} );
	} );

	test( 'making a shot', () => {
		jest.useFakeTimers();
		Math.random = () => 1;
		const diagramFire = jest.fn( () => {} );
		playerDiagram.once( 'shot', diagramFire );

		game.send( 'enemy_turn' );

		expect( game.state ).toBe( 'enemy_waiting' );
		jest.runAllTimers();
		
		expect( game.state ).toBe( 'moving' );
		expect( diagramFire.mock.calls.length ).toBe( 1 );

		Math.random = randomFunc;
	} );

} );