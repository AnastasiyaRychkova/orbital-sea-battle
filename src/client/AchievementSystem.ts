import { makeObservable, observable, action } from "mobx";
import scheme from './achievements.json';

type InitializationObject = {
	level: number,
	score: number,
};

class AchievementSystem
{
	level: number = 1;
	name: string = '';
	score: number = 0;
	goal: number = 0;


	constructor()
	{
		makeObservable( this, {
			level: observable,
			name: observable,
			score: observable,
			goal: observable,

			receive: action,
			initialize: action,
		});

		this._loadProgress();

	}

	private _loadProgress(): void
	{
		this.level = 1;
		this.name = scheme.levels[0].name;
		this.goal = scheme.levels[0].goal;
		this.score = 0;
	}

	receive( cost: number ): void
	{
		let newScore = this.score + cost;
		this._setNewScore( newScore );
	}

	initialize( {
		level,
		score,
	}: InitializationObject ): void
	{
		this.level = level;
		this.score = score;
		this.goal = scheme.levels[level - 1].goal;
		this.name = scheme.levels[level - 1].name;
	}

	private _setNewScore( newScore: number ): void
	{
		if( newScore >= this.goal )
		{
			if( this.level >= scheme.levels.length )
			{
				this.score = this.goal;
				return;
			}
			this.score = newScore - this.goal;
			this.goal = scheme.levels[this.level].goal;
			this.name = scheme.levels[this.level].name;
			this.level++;
		}
		else {
			this.score = newScore;
		}
	}
}

const achievements = new AchievementSystem();

export default achievements;