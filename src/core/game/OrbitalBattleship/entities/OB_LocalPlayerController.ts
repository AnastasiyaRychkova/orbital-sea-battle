import Chemistry, { BlockQN, CellQN } from "../../Services/Chemistry";
import type { OB_IGameState, OB_ILocalPlayer, OB_ILocalPlayerController } from '../OB_Entities';



class OB_LocalPlayerController implements OB_ILocalPlayerController
{
	#player: OB_ILocalPlayer;

	#game: OB_IGameState;


	constructor( game: OB_IGameState )
	{
		this.#game = game;
		this.#player = game.player as OB_ILocalPlayer;
	}

	completeOnBoarding(): void
	{
		this.#game.send( 'start' );
	}


	selectElement( elemNumber: number ): void
	{
		if( !Chemistry.isElemNumberValid( elemNumber ) )
		{
			this.#game.send( 'invalid', { elemNumber } );
			return;
		}

		if( this.#player.hasSelectedElement )
		{
			this.#game.send(
				this.#player.isThisElementSelected( elemNumber ) ? 'back' : 'reselect',
				{ elemNumber }
			);
			return;
		}

		this.#game.send( 'select', { elemNumber } );
	}

	toggleCell( cell: CellQN ): void
	{
		try {
			this.#player.toggleCell( cell );
		} catch (error) {
			// TODO: PlayerController.toggleCell: Обработать ошибку
		}
	}

	toggleBlock( block: BlockQN ): void
	{
		try {
			this.#player.toggleBlock( block );
		} catch (error) {
			// TODO: PlayerController.toggleBlock: Обработать ошибку
		}
	}

	checkDiagram(): void
	{
		this.#game.send( this.#player.diagramFilledOutCorrectly() ? 'correct' : 'fail' );
	}

	cancelElementSelection(): void
	{
		this.#game.send( 'change' );
	}

	fire( cell: CellQN ): void
	{
		if( Chemistry.isCellValid( cell ) && !this.#game.enemy.hasShot( cell ) )
			this.#game.send( 'player_shot', { shot: cell } );
	}

	nameElement( elemNumber: number ): void
	{
		this.#game.send( 'player_name', { elemNumber } );
	}

	requestRematch(): void
	{
		this.#game.send( 'send_request' );
	}
}



export default OB_LocalPlayerController;

export type {
	OB_ILocalPlayerController,
}