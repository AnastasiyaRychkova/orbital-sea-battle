import { Alias } from "../Aliases";
import Profile from "../GameplayEntities/Profile";
import User from "../GameplayEntities/User";

let authorizedUser: User | null = null;

export default {
	get authorizationPassed(): boolean
	{
		return authorizedUser !== null;
	},

	get authorizedUser(): User | undefined
	{
		return authorizedUser || undefined;
	},

	get savedProfiles(): Profile[]
	{
		return [];
	},

	authorize( profile: Profile ): User
	{
		throw new Error("Method is not implemented");
	},

	createProfileAndAuthorize( name: string, alias?: Alias ): User
	{
		if( authorizedUser )
			throw new Error( "Creating a new profile and authorization is not available due to an active profile" );
			
		const profile = new Profile( { name, aliasId: alias } );
		// _saveProfile( profile );
		const user = new User( profile );
		authorizedUser = user;
		return user;
	},

	signOut(): void
	{
		authorizedUser = null;
	},

	deleteProfile( profile: Profile ): void
	{
		if( authorizedUser?.wasCreatedFromProfile( profile ) )
			throw new Error( 'Can not delete active profile. Sign out of your account and then delete it' );
		throw new Error( 'Profile deleting was not implemented' );
	}

}