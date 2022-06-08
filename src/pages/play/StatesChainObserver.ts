import { action, makeObservable, observable } from "mobx";
import { IGameState } from "../../core/game/OrbitalBattleship/OB_Entities";
import { SState } from "../../core/game/OrbitalBattleship/types";

class StatesChainObserver
{
	#gameState?: IGameState;
	states: SState[];

	constructor()
	{
		makeObservable(this, {
			states: observable,
			_listener: action.bound,
		});
		this.states = [];
	}

	listen( gameState: IGameState )
	{
		this.#gameState = gameState;
		gameState.on( 'change', this._listener );
		gameState.once( 'end', () => {
			gameState.remove( 'change', this._listener );
			this.#gameState = undefined;
		} );
		this._listener();
	}

	_listener()
	{
		if( this.#gameState )
			this.states = this.#gameState.statesChain;
	}

	get asPath(): string
	{
		return this.states.join( '/' );
	}
}



export default StatesChainObserver;