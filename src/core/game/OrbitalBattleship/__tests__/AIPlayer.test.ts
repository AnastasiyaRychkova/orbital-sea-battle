import Chemistry from "../../Chemistry";
import OB_AIPLayer from "../entities/OB_AIPLayer";
import entities from "../OB_EntitiesFabric"
import GameStateMock from '../__mocks__/GameStateMock';

describe( 'AI Player', () => {
	const user = entities.user( entities.profile({
		name: 'John',
	}) );
	const game = new GameStateMock( user, user, {
		player: entities.localPlayer,
		enemy: entities.aiPlayer,
		diagram: () => entities.diagram( entities.filter() ),
	} );
	const player = game.player;

	const enemy = game.enemy as OB_AIPLayer;

	const ai = entities.aiPlayerBehaviour( game );

	const randomFunc = Math.random;



	// preparing.selecting.instruction --(instruction.start)--> 
	test( 'element selection when game state become Choice', () => {
		jest.useFakeTimers();
		// game.send( 'start' );
		game._setStateChain( ['preparing', 'selecting', 'choice'] );
		expect( ai.hasSelectedElement ).toBeFalsy();
		expect( enemy.hasSelectedElement ).toBeFalsy();
		expect( ai._state ).toBe( 'selecting' );

		jest.runAllTimers();
		expect( ai._state ).toBe( 'waiting' );
		expect( ai.hasSelectedElement ).toBeTruthy();
		expect( enemy.hasSelectedElement ).toBeTruthy();
	} );

	// preparing.selecting.choice --(selecting.select)--> preparing.filling.instruction
	// preparing.filling.instruction --(instruction.start)--> preparing.filling.diagram
	test( 'filling out the diagram', () => {
		jest.useFakeTimers();
		// game.send( 'select' );
		// game.send( 'start' );
		game._setStateChain( ['preparing', 'filling', 'diagram'] );

		expect( game.state ).toBe( 'diagram' );
		expect( enemy.hasFilled ).toBeFalsy();
		expect( ai._state ).toBe( 'filling' );

		jest.runAllTimers();

		expect( ai._state ).toBe( 'waiting' );
		expect( enemy.hasFilled ).toBeTruthy();
	} );

	// preparing.filling.diagram --(preparing.ready)--> waiting
	// waiting --(waiting.ready)--> shooting.instruction
	test( 'mark player shot', () => {
		// game.send( 'ready' );
		// game.send( 'play' );
		const enemyDiagram = enemy.diagram!;
		game._setStateChain( ['shooting', 'moving'] );

		const cellQN = Chemistry.cell( {n: 5, l: 'd', m: 2, s: 1} );
		enemy.markEnemyShot( cellQN ).then( (result: boolean ) => {
			expect( enemyDiagram.hasSpin( cellQN ) ).toBe( result );
			expect( enemyDiagram.observableState.isDamaged( cellQN ) ).toBeTruthy();
		} );
	} );

	// shooting.instruction --(instruction.enemy_turn)--> shooting.enemy_waiting
	// shooting.enemy_waiting >--(t)>-->(enemy_waiting.shot)--> shooting.moving
	test( 'making a shot', () => {
		jest.useFakeTimers();
		const playerDiagram = player.diagram!;
		Math.random = () => 1;
		const diagramFire = jest.fn( () => {} );
		playerDiagram.once( 'shot', diagramFire );

		// game.send( 'enemy_turn' );
		game._setStateChain( ['shooting', 'enemy_waiting'] );

		expect( ai._state ).toBe( 'moving' );
		expect( game.state ).toBe( 'enemy_waiting' );
		jest.runAllTimers();
		
		expect( ai._state ).toBe( 'waiting' );
		expect( game.state ).toBe( 'moving' );
		expect( diagramFire.mock.calls.length ).toBe( 1 );

		Math.random = randomFunc;
	} );

	test( 'during the game player results are not available', () => {
		expect( enemy.getResults() ).toBeUndefined();
	} );

	// shooting.result_waiting >--(t)>-->(result_waiting.shot)--> shooting.enemy_waiting
	// shooting.enemy_waiting >--(t)>-->(enemy_waiting.name)--> shooting.end >-->[x]>-->(shooting.complete)-->results.final
	test( "naming element", () => {
		jest.useFakeTimers();
		Math.random = () => 0;
		game._setStateChain( ['shooting', 'enemy_waiting'] );
		expect( game.isOver ).toBeFalsy();
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
	} );

} );