import Chemistry, { CellQN, BlockQN, periodicTable, ChemicalElement } from "../Services/Chemistry";
import OB_ILocalPlayer from "./OB_LocalPlayerInterface";
import OB_Player, { PlayerResults, InitializeObject } from "./OB_Player";



class OB_LocalPlayer extends OB_Player implements OB_ILocalPlayer
{

	constructor( init: InitializeObject )
	{
		super( init );
	}


	/** Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	get selectedElement(): ChemicalElement | null
	{
		return this.element;
	}

	/**
	 * Загадать элемент для игры
	 * @param elemNumber Номер химического элемента в Периодической таблице
	 */
	selectElement( elemNumber: number ): void
	{
		if( !Chemistry.isElemNumberValid( elemNumber ) )
			throw new Error( `Selected element number is not valid: (${elemNumber})` );

		this.element = periodicTable.element( elemNumber );
		this._emit( 'selection', {
			elementNumber: this.element.number,
		} );
	}


	/**
	 * Переключить состояние блока целиком на противоположное.
	 * Если блок заполнен частично, то он будет заполнен целиком.
	 * @param block Квантовые числа, определяющие блок на диаграмме
	 */
	toggleBlock( block: BlockQN ): void
	{
		if( !this.diagram )
			throw new Error( "Diagram was not initialized" );
		
		this.diagram.toggleBlock( block );
	}

	/**
	 * Переключить состояние ячейки на противоположное.
	 * @param cell Квантовые числа, определяющие ячейку на диаграмме
	 */
	toggleCell( cell: CellQN ): void
	{
		if( !this.diagram )
			throw new Error( "Diagram was not initialized" );

		this.diagram.toggleCell( cell );
	}

	/**
	 * Проверить заполнение диаграммы: соответствует ли диаграмма выбранному элементу.
	 * @returns Правильность заполнения диаграммы
	 */
	diagramFilledOutCorrectly(): boolean
	{
		if( !this.element || !this.diagram )
			throw new Error( "Unable to check diagram filling: " + (
					!this.element
						? "Element is not selected"
						: "Diagram is not setted"
				)
			);

		return this.diagram.isEqual( this.element.config );
	}

	/**
	 * Отметить выстрел соперника на диаграмме игрока.
	 * Диаграмма инициирует событие `shot`.
	 * @param cell Ячейка диаграммы, в которую стреляют
	 * @returns Результат выстрела: попал или нет. Если диаграмма не установлена или в данную ячейку уже был произведен выстрел, то функция возвращает `false` и не инициирует событие выстрела.]
	 */
	markEnemyShot( cell: CellQN ): boolean
	{
		if( !this.diagram )
			throw new Error( "Diagram was not initialized" );

		return this.diagram.fire( cell );
	}


	/**
	 * Этот элемент загадал?
	 * @param elemNumber Периодический номер предполагаемого элемента
	 * @returns Этот ли элемент загадал игрок
	 */
	isThisElementSelected( elemNumber: number ): boolean
	{
		return this.element?.number === elemNumber;
	}
}



export default OB_LocalPlayer;

export type {
	OB_ILocalPlayer,
}