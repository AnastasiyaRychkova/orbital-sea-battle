import { action, makeObservable, observable } from "mobx";
import { GSEventData, GSStateChanging } from "../../core/game/OrbitalBattleship/interfaces/OB_GameStateInterface";
import { IGameState } from "../../core/game/OrbitalBattleship/OB_Entities";
import { SState } from "../../core/game/OrbitalBattleship/types";
import { EventData } from "../../core/util/EventEmitter/EventProviderInterface";

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

	_listener( data?: EventData<GSEventData> )
	{
		if( this.#gameState )
		{
			this.states = data ? (data.detail as GSStateChanging).state : this.#gameState.statesChain;
			console.log( 'States:', this.states );
		}
	}

	get asPath(): string
	{
		return this.states.join( '/' );
	}
}



export default StatesChainObserver;