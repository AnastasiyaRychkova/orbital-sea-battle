import IQuantumNumber from "../../ChemicalElement/QuantumNumberInterface";

/**
 * Элемент фильтра, отвечающий за одно квантовое число. Может по разному реагировать на повторное присвоение значения.
 */
interface INote
{
	isEqual( qn: IQuantumNumber | undefined ): boolean;
	set( qn: IQuantumNumber ): void;
	getValueAsString(): string;
	getValue(): IQuantumNumber | undefined;

	isSat(): boolean;
	activate(): void;
	reset(): void;
}


export default INote;