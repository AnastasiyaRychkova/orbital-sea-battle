export type AchievementType = {
	coins: number;
	points: number;
	level: number;
};

/**
 * Достижения игрока
 */
class Achievement
{
	/** Полученные монеты */
	private _coins: number = 0;

	/** Полученные баллы опыта */
	private _points: number = 0;

	/** Достигнутый уровень */
	private _level: number = 1;

	get coins(): number
	{
		return this._coins;
	}

	get points(): number
	{
		return this._points;
	}

	get level(): number
	{
		return this._level;
	}

}



export default {
	create(): Achievement
	{
		return new Achievement();
	}
}