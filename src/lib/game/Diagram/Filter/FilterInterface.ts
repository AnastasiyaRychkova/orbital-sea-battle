import { QuantumNumbers } from "../../ChemicalElement/QuantumNumbers";

export type StoreKey = 'n'|'l'|'m'|'s';

interface IFilter
{
	isCellSelected( qn: QuantumNumbers ): boolean;
	isContainerSelected( qn: QuantumNumbers ): boolean;
	isShipSelected( qn: QuantumNumbers ): boolean;

	getValue( key: StoreKey ): string|undefined;
	setValue( key: StoreKey, value?: string ): void;
	
	isDisable( key: StoreKey ): boolean; // TOTHINK: Может переименовать на isOn() и switch()?
	setDisable( key: StoreKey, newState: boolean ): void;

	doesSpecifyCell: boolean;
	getState(): QuantumNumbers;
	reset(): void;

	disabled: boolean;
}


export default IFilter;