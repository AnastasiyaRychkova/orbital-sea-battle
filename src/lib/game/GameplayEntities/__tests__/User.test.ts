import User, { IUserInitObj } from "../User";
import Aliases from "../../Aliases";


describe( 'User object', () => {
	let userInitObj: IUserInitObj;


	beforeAll( () => {
		userInitObj = {
			name: 'Max',
			alias: Aliases.array[0],
			lastVisit: new Date( 2022, 2, 24, 4 ),
		};
	} );

	test( 'Reading User object fields', () => {
		const user = new User( userInitObj );

		expect( user.name ).toEqual( 'Max' );
		expect( user.alias.name ).toEqual( 'Менделеев' );
		expect( typeof user.alias.description === 'string' && user.alias.description.length > 0 ).toBeTruthy();
		expect( user.lastVisit.getTime() ).toEqual( new Date( '2022-03-24T04:00:00' ).getTime() );
		expect( user.coins ).toBe( 0 );
		expect( user.points ).toBe( 0 );
		expect( user.level ).toBe( 1 );
	} );

	test( 'Rename user', () => {
		const user = new User( userInitObj );
		user.rename( 'Alex' );

		expect( user.name ).toEqual( 'Alex' );
	} );

	test( 'Inability to rename to empty string', () => {
		const user = new User( userInitObj );
		user.rename( '' );

		expect( user.name ).toEqual( 'Max' );
	} );

	test( 'Changing user alias', () => {
		const user = new User( userInitObj );
		user.changeAlias( Aliases.array[1] );

		expect( user.alias.name ).toEqual( 'Гофман' );
	} );
} )