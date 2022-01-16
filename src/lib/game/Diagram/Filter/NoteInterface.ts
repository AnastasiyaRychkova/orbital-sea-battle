import IQuantumNumber from "../../ChemicalElement/QuantumNumberInterface";

/**
 * Элемент фильтра, отвечающий за одно квантовое число. Может по разному реагировать на повторное присвоение значения.
 */
interface INote
{
	isEqual( qn: IQuantumNumber | undefined ): boolean;
	set( qn?: IQuantumNumber ): void;
	getAsString(): string;
	get(): IQuantumNumber | undefined;

	/** Установлено ли значение. Если фильтр деактивирован, то метод возвращает `false`. */
	isSat(): boolean;
	isDisabled(): boolean;
	setDisabled( disabled: boolean ): void;
	reset(): void;
}


export default INote;