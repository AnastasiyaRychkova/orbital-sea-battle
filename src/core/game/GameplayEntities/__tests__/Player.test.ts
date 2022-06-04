import Player from "../Player";
import User from "../User";
import Profile from "../Profile";

describe( 'Player object', () => {

	test( 'getting player name', () => {
		const profile = new Profile( {
			name: 'Макс',
			aliasId: 'mdl',
		} );
		const user = new User( profile );
		const player = new Player( user );

		expect( player.name ).toEqual( 'Макс' );
	} );

	test( 'getting player name with emoji', () => {
		const profile = new Profile( {
			name: 'Alex✨',
			aliasId: 'mdl',
		} );
		const user = new User( profile );
		const player = new Player( user );

		expect( player.name ).toEqual( 'Alex✨' );
	} );

	test( 'getting player alias', () => {
		const profile = new Profile( {
			name: 'Макс',
			aliasId: 'mdl',
		} );
		const user = new User( profile );
		const player = new Player( user );

		expect( player.alias.name ).toEqual( 'Менделеев' );
	} );


} )