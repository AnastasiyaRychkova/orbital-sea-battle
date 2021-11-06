import { QuantumNumbers } from "../../ChemicalElement/QuantumNumbers";

export type StoreKey = 'n'|'l'|'m'|'s';
export type FilterType = 'checkbox'|'radio';

interface IFilter
{
	isCellSelected( qn: QuantumNumbers ): boolean;
	isContainerSelected( qn: QuantumNumbers ): boolean;
	isShipSelected( qn: QuantumNumbers ): boolean;

	getValue( key: StoreKey ): string|undefined;
	setValue( key: StoreKey, value?: string ): void;
	
	isDisable( key: StoreKey ): boolean; // TOTHINK: Может переименовать на isOn() и switch()?
	setDisable( key: StoreKey, newState: boolean ): void;

	doesSpecifyCell(): boolean;
	getState(): QuantumNumbers;
	reset(): void;

	setType( type: FilterType ): void;

	disabled: boolean;
}


export default IFilter;