import core, {Auth} from "../../core/core";
import { action, observable } from "mobx";
import entities from "../../core/game/OrbitalBattleship/OB_EntitiesFabric";
import GamesManager from "../../core/game/Services/GamesManager";
import type {
	OrbitalBattleshipGameAI,
	IGameState,
	ILocalPlayerController,
} from "../../core/game/OrbitalBattleship/OB_Entities";
import StatesChainObserver from "./StatesChainObserver";

const profile = entities.profile({
	name: 'Игрок',
	aliasId: 'mdl',
	level: 2,
	points: 100,
});
// let playerController: ILocalPlayerController | null = null;
const statesObserver = new StatesChainObserver();

type StoreType = {
	gameState: IGameState | null,
	playerController: ILocalPlayerController | null,
}

const store: StoreType = observable( {
	gameState: null,
	playerController: null,
} );

const createController = action( ( game: IGameState ) => {
	store.playerController = entities.localPlayerController( game );
} );

const setGameState = action( () => {
	store.gameState = (core.game as OrbitalBattleshipGameAI).gameState as IGameState;
	return store.gameState;
} )



export default {
	loadGame()
	{
		Auth.authorize( profile );
		GamesManager.load();
	},

	start(): IGameState
	{
		core.play( (GamesManager.gamesList)[0] );
		const game = setGameState();
		createController( game );
		statesObserver.listen( game );
		return game;
	},

	exit(): void
	{
		core.completeGame();
		store.playerController = null;
	},

	get controller(): ILocalPlayerController | null
	{
		return store.playerController;
	},

	get states(): StatesChainObserver
	{
		return statesObserver;
	},

	get gameState(): IGameState | null
	{
		return store.gameState;
	},
}
