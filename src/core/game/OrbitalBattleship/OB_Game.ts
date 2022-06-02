import GameState, { OB_IGameState as IGameState } from "./entities/OB_GameState";
import entities from "./OB_EntitiesFabric";
import type IGame from "../GameplayEntities/GameInterface";
import { User } from "./OB_Entities";

export type GameOptions = {
	name: string,
	path: string,
	ai: User,
}

class OrbitalBattleshipGameAI implements IGame
{
	name: string;
	path: string;

	#game?: IGameState;
	#aiUser: User;

	constructor( options: GameOptions )
	{
		this.name = options.name;
		this.path = options.path;
		this.#aiUser = options.ai;

		this.end = this.end.bind( this );
	}

	start( user: User ): IGame
	{
		if( this.#game )
			return this;

		this.#game = new GameState(
			user,
			this.#aiUser,
			{
				player: entities.localPlayer,
				enemy: entities.aiPlayer,
				diagram: entities.diagram,
			} );

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