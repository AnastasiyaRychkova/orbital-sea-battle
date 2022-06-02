import { randomInRange } from "../../util/util";
import Aliases, { Alias, AliasId } from "../Aliases";
import IProfile from "./ProfileInterface";

export type IProfileInitObj = {
	name: string,
	aliasId?: AliasId,
	id?: number,
}

class Profile implements IProfile
{
	protected _nickname: string;
	protected _alias: Alias;
	protected _id: number;

	constructor( initObj: IProfileInitObj )
	{
		this._nickname = initObj.name;
		this._alias = initObj.aliasId 
						? (Aliases.getById( initObj.aliasId ) || Aliases.random())
						: Aliases.random();
		this._id = initObj.id || this._generateId();
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

	private _generateId(): number
	{
		return randomInRange( 100000000000, 999999999999 );
	}

	rename( newName: string ): void
	{
		this._nickname = newName;
	}

	changeAlias( newAlias: Alias ): void
	{
		this._alias = newAlias;
	}
}



export default Profile;