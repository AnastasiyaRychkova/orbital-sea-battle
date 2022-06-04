import IProfile from "./ProfileInterface";

interface IUser extends IProfile
{
	balance: number

	wasCreatedFromProfile( profile: IProfile ): boolean
}


export default IUser;