import { makeObservable, observable, action } from "mobx";

import IQuantumNumber from "../../ChemicalElement/QuantumNumberInterface";
import INote from "./NoteInterface";

class Note implements INote
{
	qNumber: IQuantumNumber | undefined;

	constructor()
	{
		makeObservable( this, {
			qNumber: observable,

			set: action,
			reset: action,
		});
	}

	isEqual( qn: IQuantumNumber | undefined ): boolean
	{
		return this.qNumber !== undefined && this.qNumber.value === qn?.value;
	}

	set( qn: IQuantumNumber ): void
	{
		this.qNumber = this.qNumber?.value === qn.value
						? undefined
						: qn;
	}

	getValueAsString(): string
	{
		return this.qNumber
					? this.qNumber.toString()
					: '';
	}

	getValue(): IQuantumNumber | undefined
	{
		return this.qNumber;
	}

	isSat(): boolean
	{
		return this.qNumber !== undefined;
	}

	activate(): void
	{
		console.warn( 'Trying to switch on filter note.This implementation does not support this function.' );
	}

	reset(): void
	{
		this.qNumber = undefined;
	}

	

}



export default Note;