import Chemistry, { periodicTable } from "../../Services/Chemistry";
import entities from "../OB_EntitiesFabric";
import GameState from "../entities/OB_GameState";
import type { EventData } from '../../../util/EventEmitter/types.d';
import type { PlayerEventData, PlayerSelectionEventData, PlayerShotEventData } from "../types";
import type { OB_ILocalPlayerController } from "../OB_Entities";
import { GSResults, GSEventData } from "../interfaces/OB_GameStateInterface";

/**
 * 1. Выбор 41го элемента
 * 2. Установка диаграмм
 * 3. Неправильное заполнение диаграммы
 * 4. Провальная проверка диаграммы
 * 5. Выбор 29го элемента
 * 6. Правильное заполнение диаграммы
 * 7. Возврат к выбору элемента
 * 8. Возвращение к заполнению диаграммы
 * 9. Успешное прохождение проверки
 * 10. Совершение выстрела игроком
 * 11. Совершение выстрела AI противником
 * 12. Выстрел в то же место
 * 13. Выстрел за пределы диаграммы
 * 14. Называние элемента противника
 * 15. Получение результатов матча
 * 16. Запрос реванша
 * 17. Перезапуск игры
 */
describe( 'Game State: Player Controller', () => {
	const user = entities.user( { name: 'Max' } );
	const game = new GameState(
		user,
		user,
		{
			player: entities.localPlayer,
			enemy: entities.aiPlayer,
		}
	);
	const player = game.player;
	const playerDiagram = entities.diagram();
	const controller = entities.localPlayerController( game );
	const enemy = game.enemy;
	const enemyDiagram = entities.diagram();
	const ai = entities.aiPlayerBehaviour( game );
	const MAX_ELEM_NUMBER = periodicTable.MAX_ELEM_NUMBER;

	const SELECTED_ELEMENT_Cu29 = 29;
	const SELECTED_ELEMENT_Nb41 = 41;
	const playerShotCell = Chemistry.cell({ n: 2, l: 'p', m: 0, s: 1 });
	let gameResult: GSResults | undefined = undefined;
	const endGameListener = (data: EventData<GSEventData>) => {
		gameResult = data.detail as GSResults;
	}; 
	const randomFn = Math.random;



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
			receivedElement = (data.detail as PlayerSelectionEventData).elementNumber;
		};
		player.once( 'selection', selectionListener );

		controller.selectElement( SELECTED_ELEMENT_Nb41 );

		expect( receivedElement ).toBe( SELECTED_ELEMENT_Nb41 );
		expect( player.isThisElementSelected( SELECTED_ELEMENT_Nb41 ) ).toBeTruthy();
		expect( player.hasSelectedElement ).toBeTruthy();
	} );

	test( 'player diagram setting', () => {
		game.player.setDiagram( playerDiagram );
		expect( player.diagram ).not.toBeNull();
	} );

	test( 'enemy diagram setting', () => {
		game.enemy.setDiagram( enemyDiagram );
		expect( enemy.diagram ).not.toBeNull();
	} );

	// preparing.filling.instruction ---(filling.start)--> preparing.filling.diagram
	test( 'going to diagram filling after onboarding', () => {
		Math.random = () => 0;
		expect( game.state ).toBe( 'instruction' );
		controller.completeOnBoarding();
		expect( game.state ).toBe( 'diagram' );
	} );

	test( 'in diagram filling game state Enemy select element automatically', () => {
		expect( game.state ).toBe( 'diagram' );
		expect( enemy.hasSelectedElement ).toBeTruthy();
		expect( ai.hasSelectedElement ).toBeTruthy();
	} );

	test( 'if Math.random() returns 0, the enemy element is hydrogen (H 1)', () => {
		expect( enemy.isThisElementSelected( 1 ) ).toBeTruthy();
	} );

	// preparing.filling.diagram ---(filling.fail)--> preparing.filling.fail
	test( 'incorrect filling', () => {
		jest.useFakeTimers();
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

	// preparing: selecting.choice ---(selecting.reselect)--> filling.instruction
	test( 'selecting another element', () => {
		jest.useFakeTimers();
		controller.selectElement( SELECTED_ELEMENT_Cu29 );
		expect( player.isThisElementSelected( SELECTED_ELEMENT_Cu29 ) ).toBeTruthy();
	} );

	// preparing: filling.instruction ---[t0]--> filling.diagram
	test( 'onboarding is skipped after element reselection', () => {
		jest.runAllTimers();
		expect( game.state ).toBe( 'diagram' );
	} );

	test( 'diagram is cleared after element reselection', () => {
		expect( game.player.diagram?.isEqual( Chemistry.config() ) ).toBeTruthy();
	} );

	// preparing: filling.diagram ---(preparing.change)--> selecting.instruction ---[t0]--> selecting.choice
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

	// filling.diagram ---(check)--> filling.correct
	// preparing.filling.correct ---[t]>->f(preparing.ready)--> waiting >->f(play)--> shooting.instruction
	test( 'diagram checking ', () => {
		jest.useFakeTimers();
		controller.checkDiagram();

		expect( game.state ).toBe( 'correct' );
		jest.runAllTimers();
	} );

	test( 'at the end of preparing state AI has filled its diagram', () => {
		expect( enemy.hasFilled ).toBeTruthy();
	} );

	test( 'auto-transition from waiting to shooting state if both players are ready', () => {
		expect( game.state ).toBe( 'instruction' );
	} );

	// shooting.instruction ---(start)--> shooting.match_start ---(player_turn)--> shooting.moving
	test( 'skipping onboarding and getting player\'s turn', () => {
		Math.random = () => 1;
		controller.completeOnBoarding();
		expect( game.state ).toBe( 'moving' );
		
		Math.random = randomFn;
	} );

	test( 'shotsAnalyzers are fresh', () => {
		expect( player.shotsAnalyzer.candidates ).toBe( MAX_ELEM_NUMBER );
		expect( enemy.shotsAnalyzer.candidates ).toBe( MAX_ELEM_NUMBER );
	} );

	// shooting.moving ---(player_shot)--> shooting.result_waiting
	test( 'making a shot', () => {
		jest.useFakeTimers();
		const diagramListener = jest.fn( () => {} );
		enemy.diagram?.once( 'shot', diagramListener );
		controller.fire( playerShotCell );
		expect( game.state ).toBe( 'result_waiting' );
		expect( diagramListener.mock.calls ).toHaveLength( 1 );
	} );

	test( 'getting shot result from microtask', () => {
		expect( player.shotsAnalyzer.shots ).toBe( 1 );
		expect( player.shotsAnalyzer.candidates ).toBe( 5 );

		expect( enemy.shotsAnalyzer.candidates ).toBe( MAX_ELEM_NUMBER );
	} );

	// shooting.result_waiting ---(player_shot)--> shooting.enemy_waiting
	test( 'going to enemy_waiting state from macrotask', () => {
		jest.useFakeTimers();
		jest.runOnlyPendingTimers();
		expect( game.state ).toBe( 'enemy_waiting' );
	} );

	test( 'the local player cannot shoot during the opponent\'s turn', () => {
		controller.fire( playerShotCell );
		expect( game.state ).toBe( 'enemy_waiting' );
	} );

	// shooting.enemy_waiting ---(enemy_shot)--> shooting.moving
	test( 'AI making a shot', () => {
		Math.random = () => 1;
		let shotResults: PlayerShotEventData | undefined = undefined;
		const shotListener = ( data: EventData<PlayerEventData> ) => {
			shotResults = data.detail as PlayerShotEventData;
		};
		enemy.once( 'shot', shotListener );

		jest.runAllTimers();
		expect( game.state ).toBe( 'moving' );
		expect( enemy.shotsAnalyzer.shots ).toBe( 1 );
		expect( enemy.shotsAnalyzer.candidates ).toBeLessThan( MAX_ELEM_NUMBER );
		expect( shotResults ).not.toBeUndefined();
		expect( shotResults!.result ).toBeFalsy();
		expect( Chemistry.toIndex( shotResults!.cell ) ).toBe( MAX_ELEM_NUMBER - 1 );
		expect( enemy.shotsAnalyzer.candidates ).toBe( MAX_ELEM_NUMBER - 1 );
	} );

	test( 'shot at the same place is not available', () => {
		controller.fire( playerShotCell );
		expect( game.state ).toBe( 'moving' );
	} );

	test( 'shot outside the diagram  is not available', () => {
		controller.fire( Chemistry.cell({ n: 2, l: 'd', m: 0, s: 1 }) );
		expect( game.state ).toBe( 'moving' );
	} );

	// shooting.moving ---(player_name)--> shooting.result_waiting
	test( 'naming enemy element by player', () => {
		game.once( 'finish', endGameListener );
		controller.nameElement( SELECTED_ELEMENT_Nb41 );
		expect( game.state ).toBe( 'result_waiting' );
	} );

	test( 'getting result of named element checking', () => {
		const playerResults = player.getResults();
		const enemyResults = enemy.getResults();
		expect( game.isOver ).toBeTruthy();
		expect( playerResults ).not.toBeUndefined();
		expect( game.winner ).not.toBeUndefined();
		expect( game.winner === game.enemy ).toBeTruthy();
		expect( enemyResults ).not.toBeUndefined();
	} );

	// shooting.result_waiting >>---(player_name)--> end *->[x]->>(shooting.complete)>>--> results.final
	test( 'end of the game after receiving the results of checking the enemy element from the macro task', () => {
		expect( game.state ).toBe( 'final' );
		expect( gameResult ).not.toBeUndefined();
	} );

	test( 'taking game results', () => {
		const result = game.result;
		expect( result ).not.toBeUndefined();
		expect( result?.isLocalPlayerWinner ).toBeFalsy();
		expect( gameResult ).toBe( result );
	} );

	test( 'getting game score after end of game', () => {
		const score = game.score;
		expect( score ).not.toBeUndefined();
		expect( `${score.player}:${score.enemy}` ).toBe( '0:1' );
	} );

	test( 'sending request for rematch', () => {
		jest.useFakeTimers();
		controller.requestRematch();
		expect( game.state ).toBe( 'request' );
	} );

	test( 'AI player always confirm rematch', () => {
		jest.runAllTimers();
		expect( game.state ).toBe( 'choice' );
	} );

	test( 'in rematch starting game is resetting', () => {
		expect( game.player ).not.toBe( player );
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


/**
 * 1. AI противник выбирает элемент
 * 2. 
 */
describe( 'Game State: AI Player', () => {
	const user = entities.user( { name: 'John' } );
	const game = new GameState( user, user, {
		player: entities.localPlayer,
		enemy: entities.aiPlayer,
	} );
	const player = game.player;
	const controller = entities.localPlayerController( game );
	const enemy = game.enemy;
	const ai = entities.aiPlayerBehaviour( game );
	const He2 = 2;


	test( 'ai player select element', () => {
		jest.useFakeTimers();
		const listener = jest.fn( () => {} );
		enemy.once( 'selection', listener );
		controller.completeOnBoarding();

		expect( game.state ).toBe( 'choice' );
		expect( ai._state ).toBe( 'selecting' );

		jest.runAllTimers();
		expect( ai._state ).toBe( 'waiting' );
		expect( enemy.hasSelectedElement ).toBeTruthy();
		expect( listener.mock.calls ).toHaveLength( 1 );
	} );

	test( 'ai player fill diagram', () => {
		jest.useFakeTimers();
		controller.selectElement( He2 );
		controller.completeOnBoarding();
		expect( game.state ).toBe( 'diagram' );
		jest.runAllTimers();
		expect( enemy.hasFilled ).toBeTruthy();
	} );

/* 	test( 'enemy play first', () => {
		Math.random = () => 1;
		controller.toggleBlock( Chemistry.block({ n: 1, l: 's' }) );
		controller.checkDiagram();
		expect( game.state ).toBe( 'instruction' );
	} ) */
} );