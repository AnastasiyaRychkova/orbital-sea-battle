import { makeObservable, observable, action } from "mobx";

import IQuantumNumber from "../../ChemicalElement/QuantumNumberInterface";
import INote from "./NoteInterface";

class Note implements INote
{
	qNumber: IQuantumNumber;
	disabled: boolean;


	constructor( qn: IQuantumNumber, disabled: boolean = true )
	{
		makeObservable( this, {
			qNumber: observable,
			disabled: observable,

			set: action,
			activate: action,
			reset: action,
		});

		this.qNumber = qn;
		this.disabled = disabled;
	}

	isEqual( qn: IQuantumNumber | undefined ): boolean
	{
		return !this.disabled && this.qNumber.value === qn?.value;
	}

	set(qn: IQuantumNumber): void
	{
		this.qNumber = qn;
		if( this.disabled )
			this.disabled = false;
	}

	getValueAsString(): string
	{
		return this.qNumber.toString();
	}

	getValue(): IQuantumNumber
	{
		return this.qNumber;
	}

	isSat(): boolean
	{
		return !this.disabled;
	}

	activate(): void
	{
		this.disabled = false;
	}

	reset(): void
	{
		this.disabled = true;
	}
}



export default Note;