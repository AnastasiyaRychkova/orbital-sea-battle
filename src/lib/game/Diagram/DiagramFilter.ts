import { QuantumNumbers } from "../ChemicalElement/QuantumNumbers";
import QuantumNumbersTable from "../ChemicalElement/QuantumNumbersTable";

/** Фильтр диаграммы */
export default class DiagramFilter
{
	#value: QuantumNumbers = {};

	private static readonly SIZE: number = 118;

	getFilter(): QuantumNumbers
	{
		return this.#value;
	}

	setFilter( q: QuantumNumbers): DiagramFilter
	{
		this.#value = q;
		return this;
	}

	/** */
	getSelectedIndex(): number
	{
		//
		return 0;
	}

	setFilterByIndex( index: number ): DiagramFilter
	{
		this.#value = QuantumNumbersTable.getCellQNByIndex(index);
		return this;
	}

	/** Общее количество выделенных фильтром ячеек */
	selectedCellsCount(): number
	{
		//если значение спина ms не определено, то будут выделяться целые контейнеры/корабли, а не ячейки
		if ( this.#value.s === undefined )
			return 0;
			////ПЕРЕДЕЛАТЬ

		let count = 0;
		for (let i = 0; i < DiagramFilter.SIZE; i++) {
			if (this.checkingCell(QuantumNumbersTable.getCellQNByIndex(i)))
				count += 1;
		} ////АНАЛИТИЧЕСКИ?

		return count;
	}

	/**
	 * Проверка, выделена ли ячейка диаграммы установленным фильтром
	 * 
	 * @param cellQN Квантовые числа, относящиеся к ячейке
	 */
	isCellSelected( cellQN: QuantumNumbers ): boolean
	{
		//если значение спина ms не определено, то будут выделяться целые контейнеры/корабли, а не ячейки
		if ( this.#value.s === undefined )
			return false;
		
		return this.checkingCell(cellQN);
	}

	/**
	 * Проверка, выделен ли контейнер установленным фильтром
	 * 
	 * @param containerQN Квантовые числа, относящиеся к контейнеру
	 */
	isContainerSelected( containerQN: QuantumNumbers ): boolean
	{
		//если в фильтре определено значение спина ms, то контейнеры не выделяются, только отдельные ячейки
		if ( !(this.#value.s === undefined) )
			return false;
 
		//если же значение магнитного числа ml не определено, то будут выделяться целые корабли
		if ( this.#value.m === undefined )
			return false;
 
		return this.checkingContainer(containerQN);
	 }

	/**
	 * Проверка, выделен ли корабль установленным фильтром
	 * 
	 * @param shipQN Квантовые числа, относящиеся к кораблю
	 */
	isShipSelected( shipQN: QuantumNumbers ): boolean
	{
		//если в фильтре определены значение квантовых чисел ml или ms, то корабли не выделяются, только отдельные контейнеры/ячейки
		if ( !(this.#value.m === undefined) || !(this.#value.s === undefined) )
			return false;
 
		return this.checkingShip(shipQN);
	 }


	/** Закрытая функция для проверки соответствия квантовых чисел ячейки */
	private checkingCell( cellQN: QuantumNumbers ): boolean
	{
		
		if ( this.#value.s != cellQN.s )
			return false;
		
		if ( !(this.#value.m === undefined) )
			if ( this.#value.m != cellQN.m )
				return false;
		
		if ( !(this.#value.l === undefined) )
			if ( this.#value.l != cellQN.l )
				return false;
		
		if ( !(this.#value.n === undefined) )
			if ( this.#value.n != cellQN.n )
				return false;

		return true;
	}

	/** Закрытая функция для проверки соответствия квантовых чисел контейнера */
	private checkingContainer( containerQN: QuantumNumbers ): boolean
	{
		if ( this.#value.m != containerQN.m )
			return false;
		
		if ( !(this.#value.l === undefined) )
			if ( this.#value.l != containerQN.l )
				return false;
		
		if ( !(this.#value.n === undefined) )
			if ( this.#value.n != containerQN.n )
				return false;

		return true;
	}

	/** Закрытая функция для проверки соответствия квантовых чисел корабля */
	private checkingShip( shipQN: QuantumNumbers ): boolean
	{
		if ( this.#value.n === undefined && this.#value.l === undefined )
			return false;

		if ( !(this.#value.l === undefined) )
			if ( this.#value.l != shipQN.l )
				return false;

		if ( !(this.#value.n === undefined) )
			if ( this.#value.n != shipQN.n )
				return false;
		
		return true;
	}
}