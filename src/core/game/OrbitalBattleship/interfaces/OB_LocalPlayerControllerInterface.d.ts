interface OB_ILocalPlayerController
{
	completeOnBoarding(): void;

	selectElement( elemNumber: number ): void;

	toggleCell( cell: CellQN ): void;

	toggleBlock( block: BlockQN ): void;

	checkDiagram(): void;

	cancelElementSelection(): void;

	fire( cell: CellQN ): void;

	nameElement( elemNumber: number ): void;

	requestRematch(): void;
}


export default OB_ILocalPlayerController;