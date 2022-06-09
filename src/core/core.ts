import User, { IUser } from './game/GameplayEntities/User';
import type IGame from './game/GameplayEntities/GameInterface';
import Auth from './game/Services/Authorization';
import Profile from './game/GameplayEntities/Profile';
import Aliases from './game/Aliases';

export {default as browser} from './browser/Browser';
// export {default as achievements} from './browser/AchievementSystem';
export {default as storage} from './browser/BLocalStorage';
export {
	Auth,
}

let currentGame: IGame | null = null;

function _gameEndHandler() {
	currentGame = null;
}

let aiUser: User | null = null;

export default {
	get currentUser(): IUser | undefined
	{
		return Auth.authorizedUser;
	},

	get aiUser(): IUser
	{
		if( !aiUser )
		{
			const alias = Aliases.random();
			aiUser = new User( new Profile( {
				name: alias.name,
				aliasId: alias.id,
			} ) );
		}

		return aiUser;
	},

	play( game: IGame ): void
	{
		if( !this.currentUser )
			throw new Error('Trying to start new game without authorization');
		if( currentGame )
			throw Error( 'Trying to start new game while previous is not complete' );

		currentGame = game;
		currentGame.start( this.currentUser )
					.onComplete( _gameEndHandler );
	},

	completeGame(): void
	{
		if( !currentGame )
			return;

		currentGame.end();
		currentGame = null;
	},

	get game(): IGame | null
	{
		return currentGame;
	},
}