import { Alias } from "../Aliases";
import AchievementSystem from "../Services/AchievementSystem";
import UserStatistics from "../UserStatistics";
import type { AchievementType as Achievement } from "../Services/AchievementSystem";
import type IProfile from "./ProfileInterface";
import type IUser from "./UserInterface";

export type IUserInitObj = {
	lastVisit?: Date,
	created?: Date,
	achievement?: Achievement,
	statistics?: UserStatistics,
};


class User implements IUser
{
	private _profile: IProfile;
	private _lastVisitDate: Date;
	private _creationDate: Date;
	private _achievement: Achievement;
	private _statistics: UserStatistics;

	constructor( profile: IProfile, initObj: IUserInitObj = {} )
	{
		this._profile = profile;
		this._creationDate = initObj.created || new Date();
		this._lastVisitDate = initObj.lastVisit || this._creationDate;
		this._achievement = initObj.achievement || AchievementSystem.create();
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
		return this._lastVisitDate;
	}

	get created(): Date
	{
		return this._creationDate;
	}

	get balance(): number
	{
		return this._achievement.coins;
	}

	get points(): number
	{
		return this._achievement.points;
	}

	get level(): number
	{
		return this._achievement.level;
	}

	rename( newName: string ): void
	{
		if( newName )
			this._profile.rename( newName );
	}

	changeAlias( newAlias: Alias ): void
	{
		this._profile.changeAlias( newAlias );
	}

	wasCreatedFromProfile( profile: IProfile ): boolean
	{
		return this._profile.id === profile.id && this._profile.name === profile.name;
	}
}



export default User;