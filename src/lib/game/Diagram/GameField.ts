
class GameField
{
	constructor( state?: unknown )
	{
		
	}

	getElementNumber(): number {return 1;}
	setElementByNumber( number: number ) {}
	isCellMarked( index: number ): boolean {return true;}
	setCellMark( index: number, mark: boolean ) {}
	getState() {}

}



export default GameField;