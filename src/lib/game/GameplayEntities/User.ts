import { Alias } from "../Aliases";
import AchievementSystem from "../Services/AchievementSystem";
import type { AchievementType as Achievement } from "../Services/AchievementSystem";
import UserStatistics from "../UserStatistics";
import Profile, { IProfileInitObj } from "./Profile";

export type IUserInitObj = {
	lastVisit?: Date,
	achievement?: Achievement,
	statistics?: UserStatistics,
} & IProfileInitObj;


class User extends Profile
{
	private _lastVisitDate: Date;
	private _achievement: Achievement;
	private _statistics: UserStatistics;

	constructor( initObj: IUserInitObj )
	{
		super( initObj );
		this._lastVisitDate = initObj.lastVisit || new Date();
		this._achievement = initObj.achievement || AchievementSystem.create();
		this._statistics = initObj.statistics || new UserStatistics();
	}

	get lastVisit(): Date
	{
		return this._lastVisitDate;
	}

	get coins(): number
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
			this._nickname = newName;
	}

	changeAlias( newAlias: Alias ): void
	{
		this._alias = newAlias;
	}
}



export default User;