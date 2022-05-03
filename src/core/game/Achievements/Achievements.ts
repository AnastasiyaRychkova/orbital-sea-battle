import { EventData } from "../../util/EventEmitter/EventProviderInterface";
import IAchievement, { GameType } from "./AchievementInterface";
import achievements, {AchievementDescription, EAchievementType} from './AchievementsDescription';
import { periodicTable } from '../Services/Chemistry';

type InitializeObject = {
	level?: number,
	value?: number, 
};

type CompleteListener = ( description: AchievementDescription, level: number ) => void


abstract class Achievement implements IAchievement
{
	protected abstract _description: AchievementDescription;

	protected _level: number = 1;

	protected _value: number = 0;

	protected _completed: boolean;

	static onComplete?: CompleteListener;


	constructor( init: InitializeObject, completed: boolean = false )
	{
		this._level = init.level || 1;
		this._value = init.value || 0;
		this._completed = completed;
	}


	abstract listenGame( game: GameType ): void;

	abstract save(): void;


	isCompleted(): boolean
	{
		return this._completed;
	}

	protected _complete(): void
	{
		this._completed = true;
		Achievement.onComplete && Achievement.onComplete( this._description, this._level );
	}

	get level(): number
	{
		return this._level;
	}

	get goal(): number
	{
		return this._description.type === EAchievementType.singleton
				? 0
				: this._description.goals[ this._level ];
	}

	get value(): number
	{
		return this._value;
	}

	get title(): string
	{
		return this._description.title;
	}

	get description(): string
	{
		return this._description.task;
	}

	get type(): EAchievementType
	{
		return this._description.type;
	}
}


/**
 * __Секретный код__
 * 
 * Выбор элемента, случайно выбранного системой при создании данного профиля
 */
class SecretCode extends Achievement
{
	protected readonly _description: AchievementDescription = achievements.secretCode;


	constructor( init: InitializeObject, completed: boolean = false )
	{
		super( init, completed );
		if( !this._value )
		{
			this._value = periodicTable.random().number;
			this.save();
		}
	}
	


	listenGame( game: GameType ): void
	{
		if( this._completed )
			return;

		const listener = ( data: EventData<any> ) => {
			if( data.detail.state === undefined )
				return;

			if( data.detail.state === 'waiting' )
			{
				const result = game.player.isThisElementSelected !== undefined
								&& game.player.isThisElementSelected( this._value );
				if( result )
					this._complete();
				
			}
		};


		game.on( 'change', listener );
		game.once( 'end', () => {
			game.remove( 'change', listener );
		} )
	}

	save(): void
	{
		// TODO: Сохранение Achievement
		throw new Error( 'Method not implemented' );
	}
}


class Rematches extends Achievement
{
	protected readonly _description: AchievementDescription = achievements.rematches;
	
	listenGame( game: GameType ): void
	{
		throw new Error("Method not implemented.");
	}

	save(): void
	{
		throw new Error("Method not implemented.");
	}
}




export default {
	aS01( init: InitializeObject, completed: boolean = false ) { 
		return new SecretCode( init, completed );
	},
	aC02( init: InitializeObject, completed: boolean = false ) {
		return new Rematches( init, completed );
	},

	setListener( fn: CompleteListener ) {Achievement.onComplete = fn; }
}