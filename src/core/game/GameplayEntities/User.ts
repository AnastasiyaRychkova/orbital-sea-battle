import { Alias, AliasId } from "../Aliases";
import UserStatistics from "../UserStatistics";
import type IProfile from "./ProfileInterface";
import type IUser from "./UserInterface";

export type IUserInitObj = {
	balance?: number,
	statistics?: UserStatistics,
};


class User implements IUser
{
	private _profile: IProfile;
	private _balance: number;
	private _statistics: UserStatistics;

	constructor( profile: IProfile, initObj: IUserInitObj = {} )
	{
		this._profile = profile;
		this._balance = initObj.balance || 0;
		this._statistics = initObj.statistics || new UserStatistics();
	}

	get name(): string
	{
		return this._profile.name;
	}

	get alias(): Alias
	{
		return this._profile.alias;
	}

	get id(): number
	{
		return this._profile.id;
	}

	get lastVisit(): Date
	{
		return this._profile.lastVisit;
	}

	get created(): Date
	{
		return this._profile.created;
	}

	get balance(): number
	{
		return this._balance;
	}

	get points(): number
	{
		return this._profile.points;
	}

	get level(): number
	{
		return this._profile.level;
	}

	rename( newName: string ): void
	{
		if( newName )
			this._profile.rename( newName );
	}

	changeAlias( newAliasId: AliasId ): void
	{
		this._profile.changeAlias( newAliasId );
	}

	wasCreatedFromProfile( profile: IProfile ): boolean
	{
		return this._profile.id === profile.id && this._profile.name === profile.name;
	}
}



export default User;

export type {
	IUser,
};