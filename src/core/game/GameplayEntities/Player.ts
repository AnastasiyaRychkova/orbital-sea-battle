import { Alias } from "../Aliases";
import User from "./User";

class Player
{
	protected _user: User;

	constructor( user: User )
	{
		this._user = user;
	}

	get name(): string
	{
		return this._user.name;
	}

	get alias(): Alias
	{
		return this._user.alias;
	}
}



export default Player;