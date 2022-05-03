import Chemistry, { CellQN, BlockQN, periodicTable, ChemicalElement } from "../../Services/Chemistry";
import OB_ILocalPlayer from "../interfaces/OB_LocalPlayerInterface";
import { PlayerEvent, PlayerEventData } from "../types";
import OB_Player from "./OB_Player";


/**
 * __Локальный игрок__
 * 
 * Создает события:
 * - `selection` — Выбор элемента: _{elementNumber: number}_
 */
class OB_LocalPlayer extends OB_Player<PlayerEvent, PlayerEventData> implements OB_ILocalPlayer
{

	/** Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	get selectedElement(): ChemicalElement | null
	{
		return this._element;
	}

	/**
	 * Загадать элемент для игры
	 * @param elemNumber Номер химического элемента в Периодической таблице
	 */
	selectElement( elemNumber: number ): void
	{
		if( !Chemistry.isElemNumberValid( elemNumber ) )
			throw new Error( `Selected element number is not valid: (${elemNumber})` );

		this._element = periodicTable.element( elemNumber );
		this._emit( 'selection', {
			elementNumber: this._element.number,
		} );
	}


	/**
	 * Переключить состояние блока целиком на противоположное.
	 * Если блок заполнен частично, то он будет заполнен целиком.
	 * @param block Квантовые числа, определяющие блок на диаграмме
	 */
	toggleBlock( block: BlockQN ): void
	{
		if( !this._diagram )
			throw new Error( "Diagram was not initialized" );
		
		this._diagram.toggleBlock( block );
	}

	/**
	 * Переключить состояние ячейки на противоположное.
	 * @param cell Квантовые числа, определяющие ячейку на диаграмме
	 */
	toggleCell( cell: CellQN ): void
	{
		if( !this._diagram )
			throw new Error( "Diagram was not initialized" );

		this._diagram.toggleCell( cell );
	}

	/**
	 * Проверить заполнение диаграммы: соответствует ли диаграмма выбранному элементу.
	 * @returns Правильность заполнения диаграммы
	 */
	diagramFilledOutCorrectly(): boolean
	{
		if( !this._element || !this._diagram )
			throw new Error( "Unable to check diagram filling: " + (
					!this._element
						? "Element is not selected"
						: "Diagram is not setted"
				)
			);

		return this._diagram.isEqual( this._element.config );
	}

	/**
	 * Отметить выстрел соперника на диаграмме игрока.
	 * Диаграмма инициирует событие `shot`.
	 * @param cell Ячейка диаграммы, в которую стреляют
	 * @returns Результат выстрела: попал или нет. Если диаграмма не установлена или в данную ячейку уже был произведен выстрел, то функция возвращает `false` и не инициирует событие выстрела.]
	 */
	markEnemyShot( cell: CellQN ): boolean
	{
		if( !this._diagram )
			throw new Error( "Diagram was not initialized" );

		return this._diagram.fire( cell );
	}


	/**
	 * Этот элемент загадал?
	 * @param elemNumber Периодический номер предполагаемого элемента
	 * @returns Этот ли элемент загадал игрок
	 */
	isThisElementSelected( elemNumber: number ): boolean
	{
		return this._element?.number === elemNumber;
	}
}



export default OB_LocalPlayer;

export type {
	OB_ILocalPlayer,
}