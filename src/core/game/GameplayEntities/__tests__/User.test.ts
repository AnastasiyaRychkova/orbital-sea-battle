import User, { IUserInitObj } from "../User";
import Aliases from "../../Aliases";
import IProfile from "../ProfileInterface";
import Profile from "../Profile";
import IUser from "../UserInterface";


describe( 'User object', () => {
	const initName = 'Max'
	let user: IUser;


	beforeEach( () => {
		const profile = new Profile( {
			name: initName,
			aliasId: Aliases.array[0],
		} );

		user = new User( profile, {
			lastVisit: new Date( 2022, 2, 24, 4 ),
		} )
	} );

	test( 'Reading User object fields', () => {
		expect( user.name ).toEqual( 'Max' );
		expect( user.alias.name ).toEqual( 'Менделеев' );
		expect( typeof user.alias.description === 'string' && user.alias.description.length > 0 ).toBeTruthy();
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
		user.changeAlias( Aliases.array[1] );
		expect( user.alias.name ).toEqual( Aliases.array[1].name );
	} );
} )