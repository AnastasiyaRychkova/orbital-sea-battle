import { Alias } from "../Aliases";
import Profile, { IProfile } from "../GameplayEntities/Profile";
import User, { IUser } from "../GameplayEntities/User";
import Store from "./Store/Store";

let authorizedUser: IUser | null = null;

export default {
	get authorizationPassed(): boolean
	{
		return authorizedUser !== null;
	},

	get authorizedUser(): IUser | undefined
	{
		return authorizedUser || undefined;
	},

	async getSavedProfiles(): Promise<IProfile[]>
	{
		return await Store.loadProfiles();
	},

	authorize( profile: IProfile ): IUser
	{
		authorizedUser = new User( profile );
		return authorizedUser;
	},

	createProfileAndAuthorize( name: string, alias?: Alias ): IUser
	{
		if( authorizedUser )
			throw new Error( "Creating a new profile and authorization is not available due to an active profile" );
			
		const profile = new Profile( {
			name,
			aliasId: alias?.id || '_ai'
		});
		// _saveProfile( profile );
		const user = new User( profile );
		authorizedUser = user;
		return user;
	},

	signOut(): void
	{
		authorizedUser = null;
	},

	deleteProfile( profile: IProfile ): void
	{
		if( authorizedUser?.wasCreatedFromProfile( profile ) )
			throw new Error( 'Can not delete active profile. Sign out of your account and then delete it' );
		throw new Error( 'Profile deleting was not implemented' );
	}

}