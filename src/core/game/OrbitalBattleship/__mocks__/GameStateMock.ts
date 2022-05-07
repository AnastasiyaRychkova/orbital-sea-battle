import EventProvider from "../../../util/EventEmitter/EventProvider";
import OB_IGameState, { GSEvent, GSEventData, GSResults } from "../interfaces/OB_GameStateInterface";
import { OB_IPlayer, OB_IEnemy, OB_ILocalPlayer, User } from "../OB_Entities";
import { EventContext, GameScore, NamingContext, PlayersFabric, ShootingContext, SState } from "../types";

class GameStateMock extends EventProvider<GSEvent, GSEventData> implements OB_IGameState
{
	#player: OB_ILocalPlayer;
	#enemy: OB_IEnemy;
	#winner?: OB_IPlayer;
	state: SState;
	statesChain: SState[];
	
	constructor( player: User, enemy: User, fabric: PlayersFabric )
	{
		super();
		this.#player = fabric.player( player );
		this.#enemy = fabric.enemy( enemy );
		this.state = 'instruction';
		this.statesChain = ['preparing', 'selecting', 'instruction'];

		this.send = this.send.bind( this );
	}

	winner?: OB_IPlayer;
	result: GSResults | undefined;
	score: GameScore = {
		player: 0,
		enemy: 0,
	};

	get player(): OB_ILocalPlayer
	{
		return this.#player;
	}

	get enemy(): OB_IEnemy
	{
		return this.#enemy;
	}

	/**
	 * Инициировать событие в игре
	 * @param event Событие
	 * @param context Передаваемые данные для события
	 */
	send( event: string, context?: EventContext ): void
	{
		if( this.state === 'enemy_waiting' && context )
		{
			if( event === 'enemy_shot' )
			{
				this._enemyShotHandler( context as ShootingContext );
				return;
			}
			if( event === 'enemy_name' )
			{
				this._enemyNamingHandler( context as NamingContext );
				return;
			}
		}
	}

	_setStateChain( chain: SState[] ): void
	{
		this.statesChain = chain;
		this.state = chain[ chain.length - 1 ];
		this._emit( 'change', {state: this.statesChain} );
	}

	_setState( state: SState ): void
	{
		this.state = state;
		this.statesChain[ this.statesChain.length - 1 ] = state;
	}

	/**
	 * Закончилась лл игра
	 */
	get isOver(): boolean
	{
		return this.#winner !== undefined;
	}

	private _enemyShotHandler( context: ShootingContext )
	{
		const cell = context.shot;
		if( !cell )
			throw new Error("Enemy shot cell is not defined");

		const result = this.#player.markEnemyShot( cell );
		this.#enemy.markShotResult( cell, result );
		context.shot = undefined;
		this._setState( 'moving' );
	}

	/**
	 * enemy_waiting --(name)--> end
	 */
	private _enemyNamingHandler( context: NamingContext )
	{
		const elem = context.namedElemNumber;
		if( !elem )
			throw new Error("Enemy naming element number is not defined");

		this.#winner = this.#player.isThisElementSelected( elem ) ? this.#enemy : this.#player;
		this.#enemy.finishGame();
		this.#player.finishGame();

		this._setStateChain( ['results', 'final'] );
	}
}



export default GameStateMock;