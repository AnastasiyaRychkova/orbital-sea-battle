import { makeObservable, observable, action } from "mobx";

import IQuantumNumber from "../../ChemicalElement/QuantumNumberInterface";
import INote from "./NoteInterface";

class Note implements INote
{
	_qNumber: IQuantumNumber | undefined;
	_disabled: boolean;

	constructor()
	{
		makeObservable( this, {
			_qNumber: observable,
			_disabled: observable,

			set: action,
			reset: action,
			setDisabled: action,
		});

		this._disabled = false;
	}

	isDisabled(): boolean
	{
		return this._disabled;
	}

	setDisabled( disabled: boolean ): void
	{
		this._disabled = disabled;
	}

	isEqual( qn: IQuantumNumber | undefined ): boolean
	{
		return this._qNumber !== undefined && this._qNumber.value === qn?.value;
	}

	set( qn?: IQuantumNumber ): void
	{
		this._qNumber = qn
						? (this._qNumber?.value === qn.value
							? undefined
							: qn)
						: undefined;
	}

	getAsString(): string
	{
		return this._qNumber
					? this._qNumber.toString()
					: '';
	}

	get(): IQuantumNumber | undefined
	{
		return this._qNumber;
	}

	isSat(): boolean
	{
		return !this._disabled && this._qNumber !== undefined;
	}

	activate(): void
	{
		console.warn( 'Trying to switch on filter note.This implementation does not support this function.' );
	}

	reset(): void
	{
		this._qNumber = undefined;
	}

	

}



export default Note;