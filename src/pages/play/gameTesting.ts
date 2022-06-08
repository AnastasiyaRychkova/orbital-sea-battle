import core, {Auth} from "../../core/core";
import entities from "../../core/game/OrbitalBattleship/OB_EntitiesFabric";
import GamesManager from "../../core/game/Services/GamesManager";
import type {
	OrbitalBattleshipGameAI,
	IGameState,
	ILocalPlayerController,
} from "../../core/game/OrbitalBattleship/OB_Entities";

const profile = entities.profile({
	name: 'Игрок',
	level: 2,
	points: 100,
});
const user = entities.user( profile );
let playerController: ILocalPlayerController | null = null;



export default {
	loadGame()
	{
		Auth.authorize( profile );
		GamesManager.load();
		core.play( (GamesManager.gamesList)[0] );
	},

	start(): IGameState
	{
		const game = core.game as OrbitalBattleshipGameAI;
		const gameState = game.gameState as IGameState;
		playerController = entities.localPlayerController( gameState );
		return gameState;
	},

	get controller(): ILocalPlayerController | null
	{
		return playerController;
	},
}
