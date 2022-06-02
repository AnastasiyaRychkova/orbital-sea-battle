import IProfile from "./ProfileInterface";

interface IUser extends IProfile
{
	created: Date
	
	lastVisit: Date

	balance: number

	wasCreatedFromProfile( profile: IProfile ): boolean
}


export default IUser;