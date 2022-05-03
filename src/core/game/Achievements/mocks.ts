import EventProvider from "../../util/EventEmitter/EventProvider";

class PlayerMock extends EventProvider<string, any>
{
	#elementNumber: number = 0;

	diagram: null = null;


	emit( event: string, data?: object ): void
	{
		this._emit( event, data );
	}

	selectElement( elemNumber: number )
	{
		this.#elementNumber = elemNumber;
	}

	isThisElementSelected( elemNumber: number ): boolean
	{
		return this.#elementNumber === elemNumber;
	}
}



class GameMock extends EventProvider<string, any>
{
	player: PlayerMock;
	enemy: PlayerMock;

	constructor()
	{
		super();
		this.player = new PlayerMock();
		this.enemy = new PlayerMock();
	}

	emit( event: string, data?: object ): void
	{
		this._emit( event, data );
	}
}






export default {
	game() { return new GameMock(); },
	player() { return new PlayerMock(); },
};