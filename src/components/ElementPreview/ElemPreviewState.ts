import { makeObservable, observable, computed, action } from "mobx"
import periodicTable from "../../lib/game/ChemicalElement/PeriodicTable";

type ChemicalElement = {
	name: string,
	symbol: string,
	number: number,
}

class ElemPreviewState
{
	element: number;
	inputValue: number;
	changeCallback: ( number: number ) => void;

	static readonly MIN: number = 1;
	static readonly MAX: number = 118;

	constructor( elementNumber: number = 1, callback: ( number: number ) => void )
	{
		makeObservable( this, {
			element: observable,
			inputValue: observable,
			next: action.bound,
			prev: action.bound,
			setElement: action.bound,
			inputElement: action.bound,
			currentElement: computed,
			nextElement: computed,
			prevElement: computed,
		});

		this.element = Math.round( ElemPreviewState.normalize( elementNumber ) );
		this.inputValue = this.element;
		this.changeCallback = callback;
	}

	private static normalize( number: number ): number{
		if( number < ElemPreviewState.MIN )
			number = ElemPreviewState.MIN;
		else if( number > ElemPreviewState.MAX )
			number = ElemPreviewState.MAX;
		
		return number;
	}

	get currentElement(): ChemicalElement
	{
		const elem = periodicTable.element( this.element );
		return {
			name: elem.name,
			symbol: elem.symbol,
			number: this.inputValue,
		}
	}

	get nextElement(): ChemicalElement
	{
		return this.element <= ElemPreviewState.MAX
				? periodicTable.element( this.element + 1 )
				: {
					name: '',
					symbol: '',
					number: 0,
				};
	}

	get prevElement(): ChemicalElement
	{
		return this.element >= ElemPreviewState.MIN
				? periodicTable.element( this.element - 1 )
				: {
					name: '',
					symbol: '',
					number: 0,
				};
	}

	next(): void
	{
		this.element = ElemPreviewState.normalize( this.element + 1 );
		this.inputValue = this.element;
		this.changeCallback( this.element );
	}

	prev(): void
	{
		this.element = ElemPreviewState.normalize( this.element - 1 );
		this.inputValue = this.element;
		this.changeCallback( this.element );
	}

	inputElement( number: number ): void
	{
		this.inputValue = number;
		this.element = Math.round( ElemPreviewState.normalize( number ) );
		this.changeCallback( this.element );
	}

	setElement(): void
	{
		this.inputValue = this.element;
	}
}

export default ElemPreviewState;