import GameState, { OB_IGameState as IGameState } from "./entities/OB_GameState";
import entities from "./OB_EntitiesFabric";
import type IGame from "../GameplayEntities/GameInterface";
import type { IAIEnemyBehaviour, IUser } from "./OB_Entities.d";

export type GameOptions = {
	name: string,
	path: string,
	ai: IUser,
}

class OrbitalBattleshipGameAI implements IGame
{
	name: string;
	path: string;

	#game?: IGameState;
	#aiUser: IUser;
	#aiBehaviour?: IAIEnemyBehaviour;

	constructor( options: GameOptions )
	{
		this.name = options.name;
		this.path = options.path;
		this.#aiUser = options.ai;

		this.end = this.end.bind( this );
	}

	get gameState(): IGameState | undefined
	{
		return this.#game;
	}

	start( user: IUser ): IGame
	{
		if( this.#game )
			return this;

		this.#game = new GameState(
			user,
			this.#aiUser,
			{
				player: entities.localPlayer,
				enemy: entities.aiPlayer,
				diagram: () => entities.diagram( entities.filter() ),
			} );
		this.#aiBehaviour = entities.aiPlayerBehaviour( this.#game );

		this.#game.once( 'end', this.end );
		return this;
	}


	end(): IGame
	{
		if( !this.#game )
			return this;

		this.#game = undefined;
		return this;
	}


	onComplete( callback: () => void ): IGame
	{
		if( this.#game )
			this.#game.once( 'end', callback );

		return this;
	}
}



export default OrbitalBattleshipGameAI;