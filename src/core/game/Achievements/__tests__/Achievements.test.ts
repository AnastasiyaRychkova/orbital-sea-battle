import mocks from '../mocks';
import Achievements from '../Achievements';

describe( 'Testing of achievements classes: Secret Code', () => {

	test( 'Secret Code: complete task', () => {
		const game = mocks.game();
		const achievement = Achievements.aS01( {level: 1, value: 41} );
		game.player.selectElement( 41 );
		const listener = jest.fn( () => {} );
		Achievements.setListener( listener );
		achievement.listenGame( game );

		expect( achievement.isCompleted() ).toBeFalsy();

		game.emit( 'change', { state: 'waiting' } );

		expect( listener.mock.calls ).toHaveLength( 1 );
		expect( achievement.isCompleted() ).toBeTruthy();
	} );

	test( 'Secret Code: task failure', () => {
		const game = mocks.game();
		const achievement = Achievements.aS01( {level: 1, value: 41} );
		game.player.selectElement( 22 );
		const listener = jest.fn( () => {} );
		Achievements.setListener( listener );
		achievement.listenGame( game );

		expect( achievement.isCompleted() ).toBeFalsy();

		game.emit( 'change', { state: 'waiting' } );

		expect( listener.mock.calls ).toHaveLength( 0 );
		expect( achievement.isCompleted() ).toBeFalsy();
	} );

	test( 'SecretCode: creating completed task', () => {
		const game = mocks.game();
		const achievement = Achievements.aS01( {level: 1, value: 41}, true );
		game.player.selectElement( 41 );
		const listener = jest.fn( () => {} );
		Achievements.setListener( listener );
		achievement.listenGame( game );

		expect( achievement.isCompleted() ).toBeTruthy();

		game.emit( 'change', { state: 'waiting' } );

		expect( listener.mock.calls ).toHaveLength( 0 );
		expect( achievement.isCompleted() ).toBeTruthy();
	} )

} )