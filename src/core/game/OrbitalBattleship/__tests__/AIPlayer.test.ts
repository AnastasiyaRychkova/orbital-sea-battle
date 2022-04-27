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
	const player = entities.localPlayer( { user, analyzer } );
	const enemy = entities.aiPlayer( { user, analyzer: enemyAnalyzer } ) as OB_AIPLayer;
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

	test( 'during the game player results are not available', () => {
		expect( enemy.getResults() ).toBeUndefined();
	} );

	test( 'local player shot (game state machine testing)', () => {
		jest.useFakeTimers();
		const diagramFireFn = jest.fn( () => {} );
		enemyDiagram.once( 'shot', diagramFireFn );

		game.send( 'shot', {shot: Chemistry.cell( {n: 1, l: 's', m: 0, s: 1} )} );
		expect( diagramFireFn.mock.calls.length ).toBe( 1 );

	} );

	test( "naming element", () => {
		jest.useFakeTimers();
		Math.random = () => 0;
		expect( game.isOver ).toBeFalsy();
		expect( game.state ).toBe( 'result_waiting' );
		jest.runAllTimers();
		/* 
		Переход из results_waiting в enemy_waiting происходит внутри отдельной макрозадачи. После этого запускается таймер. По истечении времени решается: стрелять или называть элемент. Вычисляется вероятность и если Math.random() меньше полученной вероятности, то называется элемент (при random = 0 всегда называется элемент). 
		 */
		expect( game.state ).toBe( 'final' );
		expect( game.isOver ).toBeTruthy();

		Math.random = randomFunc;
	} );

	test( 'getting player game results', () => {
		const results = enemy.getResults();
		expect( results ).not.toBeUndefined();
		expect( results!.steps ).toBe( 1 );
		expect( player.getResults() ).not.toBeUndefined();
	} )

} );