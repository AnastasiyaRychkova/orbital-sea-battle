interface OB_ILocalPlayerController
{
	completeOnBoarding(): void;

	selectElement( elemNumber: number ): void;

	toggleCell( cell: CellQN ): void;

	toggleBlock( block: BlockQN ): void;

	checkDiagram(): void;

	cancelElementSelection(): void;
}


export default OB_ILocalPlayerController;