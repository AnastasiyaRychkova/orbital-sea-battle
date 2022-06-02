import Aliases from "../../Aliases";
import Profile from "../../GameplayEntities/Profile";
import User from "../../GameplayEntities/User";
import Auth from "../Authorization";

describe( 'Authorization Service', () => {

	test( 'service has been loaded', () => {
		expect( Auth ).not.toBeUndefined();
	} );

	test( 'no authorized user after loading service', () => {
		expect( Auth.authorizationPassed ).toBeFalsy();
		expect( Auth.savedProfiles ).toHaveLength( 0 );
	} );

	test( 'creation a new profile', () => {
		const name = 'Max'
		Auth.createProfileAndAuthorize( name, Aliases.random() );
		expect( Auth.authorizationPassed ).toBeTruthy();
		expect( Auth.authorizedUser ).not.toBeUndefined();
		expect( (Auth.authorizedUser as User).name ).toBe( name );
	} );

	test( 'creating a new profile is not available, when authorization was passed', () => {
		expect( () => {Auth.createProfileAndAuthorize( 'Jane', Aliases.random() )} ).toThrowError();
	} );

	test( 'deleting current profile is not available', () => {
		const user = Auth.authorizedUser!;
		const profile = new Profile( {
			name: user.name,
			aliasId: user.alias,
			id: user.id,
		} );

		expect( () => { Auth.deleteProfile( profile ) } ).toThrow( 'Can not delete active profile. Sign out of your account and then delete it' );
	} );

	test( 'deleting profile with the same id but different name', () => {
		const user = Auth.authorizedUser!;
		const profile = new Profile( {
			name: 'Other name',
			aliasId: user.alias,
			id: user.id,
		} );

		expect( () => { Auth.deleteProfile( profile ) } ).toThrow( 'Profile deleting was not implemented' );
	} );

	test( 'sign out', () => {
		expect( Auth.authorizationPassed ).toBeTruthy();
		Auth.signOut();
		expect( Auth.authorizationPassed ).toBeFalsy();
	} );

	/* test( 'new profile was saved', () => {
		expect( Auth.savedProfiles ).toHaveLength( 1 );
	} ); */

} );