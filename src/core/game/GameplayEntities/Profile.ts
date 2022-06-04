import { randomInRange } from "../../util/util";
import Aliases, { Alias, AliasId } from "../Aliases";
import IProfile from "./ProfileInterface";

export type IProfileInitObj = {
	name: string,
	aliasId?: AliasId,
	id?: number,
	level?: number,
	points?: number,
	lastVisit?: Date,
	created?: Date,
}

class Profile implements IProfile
{
	protected _nickname: string;
	protected _alias: Alias;
	protected _id: number;
	protected _points: number;
	protected _level: number;
	protected _lastVisitDate: Date;
	protected _creationDate: Date;

	constructor( initObj: IProfileInitObj )
	{
		this._nickname = initObj.name;
		this._alias = initObj.aliasId 
						? (Aliases.getById( initObj.aliasId ) || Aliases.random())
						: Aliases.random();
		this._id = initObj.id || this._generateId();
		this._points = initObj.points || 0;
		this._level = initObj.level || 1;
		this._creationDate = initObj.created || new Date();
		this._lastVisitDate = initObj.lastVisit || this._creationDate;
	}

	get name(): string
	{
		return this._nickname;
	}

	get alias(): Alias
	{
		return this._alias;
	}

	get id(): number
	{
		return this._id;
	}

	get points(): number
	{
		return this._points;
	}

	get level(): number
	{
		return this._level;
	}

	get lastVisit(): Date
	{
		return this._lastVisitDate;
	}

	get created(): Date
	{
		return this._creationDate;
	}

	private _generateId(): number
	{
		return randomInRange( 100000000000, 999999999999 );
	}

	rename( newName: string ): void
	{
		this._nickname = newName;
	}

	changeAlias( newAliasId: AliasId ): void
	{
		this._alias = Aliases.getById( newAliasId ) || this._alias;
	}
}



export default Profile;