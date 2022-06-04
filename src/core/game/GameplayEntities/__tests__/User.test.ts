import User, { IUserInitObj } from "../User";
import Aliases from "../../Aliases";
import Profile from "../Profile";
import IUser from "../UserInterface";


describe( 'User object', () => {
	const initName = 'Max'
	let user: IUser;


	beforeEach( () => {
		const profile = new Profile( {
			name: initName,
			aliasId: 'mdl',
			lastVisit: new Date( 2022, 2, 24, 4 ),
		} );

		user = new User( profile );
	} );

	test( 'Reading User object fields', () => {
		expect( user.name ).toEqual( 'Max' );
		expect( user.alias.name ).toEqual( 'Менделеев' );
		expect( user.lastVisit.getTime() ).toEqual( new Date( '2022-03-24T04:00:00' ).getTime() );
		expect( user.balance ).toBe( 0 );
		// expect( user.points ).toBe( 0 );
		// expect( user.level ).toBe( 1 );
	} );

	test( 'Rename user', () => {
		const newName = 'Alex'
		user.rename( newName );
		expect( user.name ).toEqual( newName );
	} );

	test( 'Inability to rename to empty string', () => {
		user.rename( '' );
		expect( user.name ).toEqual( initName );
	} );

	test( 'Changing user alias', () => {
		user.changeAlias( 'gfm' );
		expect( user.alias.name ).toEqual( 'Гофман' );
	} );
} )