import IGame from "../GameplayEntities/GameInterface";
import Profile from "../GameplayEntities/Profile";
import User from "../GameplayEntities/User";
import OrbitalBattleshipGameAI from "../OrbitalBattleship/OB_Game";

const aiUser = new User( new Profile( {
				name: 'Droid',
				aliasId: '_ai',
			} ) );

const games: IGame[] = [];

export default {
	load()
	{
		if( games.length > 0 )
			return;

		games.push( new OrbitalBattleshipGameAI({
			name: 'OrbitalBattleship',
			ai: aiUser,
			path: '/',
		}) );
	},

	get gamesList(): IGame[]
	{
		return games;
	},
}