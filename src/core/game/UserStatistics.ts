class UserStatistics
{
	private _matchesComplete: number = 0;
	private _victories: number = 0;

	constructor()
	{
		
	}

	get games(): number
	{
		return this._matchesComplete;
	}

	get victories(): number
	{
		return this._victories;
	}
}



export default UserStatistics;