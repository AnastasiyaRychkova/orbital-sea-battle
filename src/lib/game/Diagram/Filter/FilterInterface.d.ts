import { QuantumNumbers } from "../../ChemicalElement/QuantumNumbers";

export type StoreKey = 'n'|'l'|'m'|'s';

export type StringState = [string, string, string, string];

export type FilterEvent = 'changed';
export type FilterEventData = {
	state: StringState,
	scheme: {[k in StoreKey]: number},
}


export default interface IFilter
{
	isCellSelected( qn: QuantumNumbers ): boolean;
	isContainerSelected( qn: QuantumNumbers ): boolean;
	isShipSelected( qn: QuantumNumbers ): boolean;

	getValue( key: StoreKey ): string|undefined;
	setValue( key: StoreKey, value?: string ): void;
	
	isDisable( key: StoreKey ): boolean; // TOTHINK: Может переименовать на isOn() и switch()?
	setDisable( key: StoreKey, newState: boolean ): void;

	doesSpecifyCell: boolean;
	state: QuantumNumbers;
	reset(): void;

	disabled: boolean;
}
