import Chemistry from "../../Services/Chemistry";
import entities from "../OB_EntitiesFabric";
import GameState, { OB_IGameState } from "../entities/OB_GameState";
import type { OB_IEnemy, OB_ILocalPlayer, ILocalPlayerController, IUser } from "../OB_Entities";
import OB_AIEnemyBehaviour from "../entities/OB_AIEnemyBehaviour";



describe( 'Game State: General', () => {
	let user: IUser;
	let game: OB_IGameState;
	let controller: ILocalPlayerController;
	let ai: OB_AIEnemyBehaviour;
	let player: OB_ILocalPlayer;
	let enemy: OB_IEnemy;


	beforeEach( () => {
		user = entities.user( entities.profile({ name: 'Max' }) );
		game = new GameState(
			user,
			user,
			{
				player: entities.localPlayer,
				enemy: entities.aiPlayer,
				diagram: () => entities.diagram( entities.filter() ),
			}
		);
		controller = entities.localPlayerController( game );
		ai = entities.aiPlayerBehaviour( game );

		player = game.player;
		enemy = game.enemy;
	} );


	test( 'giving in during instruction', () => {
		expect( game.state ).toBe( 'instruction' );
		controller.giveIn();
		expect( game.state ).toBe( 'final' );
		checkScore( game, 0, 1 );
		checkGameResult( game, 0 );
	} );


	test( 'giving in during checking of diagram filling', () => {
		const H = 1;
		controller.completeOnBoarding();
		controller.selectElement( H );
		controller.completeOnBoarding();
		controller.toggleCell( Chemistry.cell({ n: 1, l: 's', m: 0, s: 1 }) );
		controller.checkDiagram();
		expect( game.state ).toBe( 'correct' );

		controller.giveIn();
		expect( game.state ).toBe( 'final' );
		checkScore( game, 0, 1 );
		checkGameResult( game, H );
	} );

	test( 'giving in during enemy turn', () => {
		jest.useFakeTimers();
		const H = 1;
		controller.completeOnBoarding();
		controller.selectElement( H );
		controller.completeOnBoarding();
		controller.toggleCell( Chemistry.cell({ n: 1, l: 's', m: 0, s: 1 }) );
		controller.checkDiagram();
		Math.random = () => 0;
		jest.runAllTimers();
		controller.completeOnBoarding();
		expect( game.state ).toBe( 'enemy_waiting' );

		controller.giveIn();
		expect( game.state ).toBe( 'final' );
		checkScore( game, 0, 1 );
		checkGameResult( game, H );
	} );




/*----------------------------------*/

	function checkScore( game: OB_IGameState, player: number, enemy: number ): void
	{
		const score = game.score;
		expect( score.enemy ).toBe( enemy );
		expect( score.player ).toBe( player );
	}

	function checkGameResult( game:OB_IGameState, elem: number ): void
	{
		expect( game.isOver ).toBeTruthy();
		
		const result = game.result;
		expect( result ).not.toBeUndefined();

		expect( result?.isLocalPlayerWinner ).toBeFalsy();
		expect( result?.player.elemNumber ).toBe( elem );
	}
});