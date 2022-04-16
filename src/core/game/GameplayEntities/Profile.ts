import Aliases, { Alias } from "../Aliases";

export type IProfileInitObj = {
	name: string,
	alias?: Alias,
}

class Profile
{
	protected _nickname: string;
	protected _alias: Alias;

	constructor( initObj: IProfileInitObj )
	{
		this._nickname = initObj.name;
		this._alias = initObj.alias || Aliases.random();
	}

	get name(): string
	{
		return this._nickname;
	}

	get alias(): Alias
	{
		return this._alias;
	}
}



export default Profile;