import IGame from "../GameplayEntities/GameInterface";

export type GameOptions = {
	name: string,
	path: string,
	isOnline: boolean,
}

class OrbitalBattleshipGame implements IGame
{
	name: string;
	path: string;

	/** Игра против компьютера или сетевая */
	#isOnline: boolean;

	constructor( options: GameOptions )
	{
		this.name = options.name;
		this.path = options.path;
		this.#isOnline = options.isOnline;
	}

	start(): void {
		throw new Error("Method not implemented.");
	}
	end(): void {
		throw new Error("Method not implemented.");
	}
}



export default OrbitalBattleshipGame;