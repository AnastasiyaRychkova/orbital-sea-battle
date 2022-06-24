import type { IQuantumNumber } from "../../Chemistry/types";

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
	isSet(): boolean;
	isDisabled(): boolean;
	setDisabled( disabled: boolean ): void;
	reset(): void;
}

export default INote;