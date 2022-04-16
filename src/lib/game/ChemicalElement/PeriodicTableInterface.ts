import type { ChemicalElement } from "./ChemicalElement";
import QNSchemeInterface from "./QNSchemeInterface";

interface PeriodicTableInterface
{
	/**
	 * Получить элемент из таблицы по его номеру
	 * @param number Периодический номер элемента
	 */
	element( number: number ): ChemicalElement;

	/**
	 * Получить массив всех элементов
	 */
	asArray(): ChemicalElement[];

	readonly converter: QNSchemeInterface;
}


export default PeriodicTableInterface;