import Player from "../Player";
import User, { IUserInitObj } from "../User";
import Aliases from "../../Aliases";

describe( 'Player object', () => {

	test( 'getting player name', () => {
		const userInitObj: IUserInitObj = {
			name: 'Макс',
			alias: Aliases.array[0],
		};
		const user = new User( userInitObj );
		const player = new Player( user );

		expect( player.name ).toEqual( 'Макс' );
	} );

	test( 'getting player name with emoji', () => {
		const userInitObj: IUserInitObj = {
			name: 'Alex✨',
			alias: Aliases.array[0],
		};
		const user = new User( userInitObj );
		const player = new Player( user );

		expect( player.name ).toEqual( 'Alex✨' );
	} );

	test( 'getting player alias', () => {
		const userInitObj: IUserInitObj = {
			name: 'Макс',
			alias: Aliases.array[0],
		};
		const user = new User( userInitObj );
		const player = new Player( user );

		expect( player.alias.name ).toEqual( 'Менделеев' );
		expect( typeof player.alias.description ).toEqual( 'string' );
		expect( player.alias.description ).not.toHaveLength( 0 );
	} );


} )