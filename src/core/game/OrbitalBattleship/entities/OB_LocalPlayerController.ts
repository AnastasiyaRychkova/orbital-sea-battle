import Chemistry, { BlockQN, CellQN } from "../../Services/Chemistry";
import type { IGameState, ILocalPlayerController } from '../OB_Entities';



class OB_LocalPlayerController implements ILocalPlayerController
{

	#game: IGameState;


	constructor( game: IGameState )
	{
		this.#game = game;
		this.checkDiagram = this.checkDiagram.bind( this );
		this.fire = this.fire.bind( this );
		this.nameElement = this.nameElement.bind( this );
		this.requestRematch = this.requestRematch.bind( this );
		this.giveIn = this.giveIn.bind( this );
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

		if( this.#game.player.hasSelectedElement )
		{
			this.#game.send(
				this.#game.player.isThisElementSelected( elemNumber ) ? 'back' : 'reselect',
				{ elemNumber }
			);
			return;
		}

		this.#game.send( 'select', { elemNumber } );
	}

	toggleCell( cell: CellQN ): void
	{
		try {
			this.#game.player.toggleCell( cell );
		} catch (error) {
			// TODO: PlayerController.toggleCell: Обработать ошибку
		}
	}

	toggleBlock( block: BlockQN ): void
	{
		try {
			this.#game.player.toggleBlock( block );
		} catch (error) {
			// TODO: PlayerController.toggleBlock: Обработать ошибку
		}
	}

	checkDiagram(): void
	{
		console.log( this.#game.state );
		this.#game.send( this.#game.player.diagramFilledOutCorrectly() ? 'correct' : 'fail' );
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

	giveIn(): void
	{
		this.#game.send( 'give_in' );
	}

	confirmRematch(): void
	{
		this.#game.send( 'rematch' );
	}

	rejectRematch(): void
	{
		this.#game.send( 'reject' );
	}

	exit(): void
	{
		this.#game.send( 'exit' );
	}
}



export default OB_LocalPlayerController;

export type {
	ILocalPlayerController as OB_ILocalPlayerController,
}