import EventProvider from "../../util/EventEmitter/EventProvider";
import User from "../GameplayEntities/User";
import Chemistry, { CellQN, BlockQN, periodicTable } from "../Services/Chemistry";
import OB_ILocalPlayer from "./OB_LocalPlayerInterface";
import type IDiagram from "../Diagram/DiagramInterface";



class OB_LocalPlayer extends EventProvider<string, object> implements OB_ILocalPlayer
{
	#user: User;

	/**
	 * Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	#elementNumber: number;

	/**
	 * Диаграмма игрока.
	 * Изначально равна `null`.
	 * Чтобы начать заполнение диаграммы, необходимо её инициализировать.
	 * Диаграмма сразу не инициализируется, чтобы иметь возможность её создать снаружи,
	 * предоставив доступ к ней UI-компонентам.
	*/
	#diagram: IDiagram | null;


	constructor( user: User )
	{
		super();
		this.#user = user;

		this.#elementNumber = 0;
		this.#diagram = null;
	}


	/** Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	get selectedElement(): number
	{
		return this.#elementNumber;
	}

	/**
	 * Загадать элемент для игры
	 * @param elemNumber Номер химического элемента в Периодической таблице
	 */
	selectElement( elemNumber: number ): void
	{
		if( !Chemistry.isElemNumberValid( elemNumber ) )
			throw new Error( `Selected element number is not valid: (${elemNumber})` );

		this.#elementNumber = elemNumber;
		this._emit( 'selection', {
			elementNumber: this.#elementNumber,
		} );
	}

	/**
	 * Установка объекта состояния диаграммы снаружи класса.
	 * Позволяет установить тот экземпляр класса,
	 * который подходит для пользовательского интерфейса,
	 * что делает LocalPlayer независимым от интерфейса.
	 * @param diagram Диаграмма
	 */
	setDiagram( diagram: IDiagram ): void
	{
		this.#diagram = diagram;
	}

	/**
	 * Переключить состояние блока целиком на противоположное.
	 * Если блок заполнен частично, то он будет заполнен целиком.
	 * @param block Квантовые числа, определяющие блок на диаграмме
	 */
	toggleBlock( block: BlockQN ): void
	{
		if( !this.#diagram )
			throw new Error( "Diagram was not initialized" );
		
		this.#diagram.toggleBlock( block );
	}

	/**
	 * Переключить состояние ячейки на противоположное.
	 * @param cell Квантовые числа, определяющие ячейку на диаграмме
	 */
	toggleCell( cell: CellQN ): void
	{
		if( !this.#diagram )
			throw new Error( "Diagram was not initialized" );

		this.#diagram.toggleCell( cell );
	}

	/**
	 * Проверить заполнение диаграммы: соответствует ли диаграмма выбранному элементу.
	 * @returns Правильность заполнения диаграммы
	 */
	diagramFilledOutCorrectly(): boolean
	{
		if( this.#elementNumber < 1 || !this.#diagram )
			throw new Error( "Unable to check diagram filling: " + (
					this.#elementNumber < 1
						? "Element is not selected"
						: "Diagram is not setted"
				)
			);

		return this.#diagram.isEqual( periodicTable.element( this.#elementNumber ).config );
	}

	/**
	 * Отметить выстрел соперника на диаграмме игрока.
	 * Диаграмма инициирует событие `shot`.
	 * @param cell Ячейка диаграммы, в которую стреляют
	 * @returns Результат выстрела: попал или нет. Если диаграмма не установлена или в данную ячейку уже был произведен выстрел, то функция возвращает `false` и не инициирует событие выстрела.]
	 */
	markEnemyShot( cell: CellQN ): boolean
	{
		if( !this.#diagram )
			throw new Error( "Diagram was not initialized" );

		return this.#diagram.fire( cell );
	}

		/**
	 * Отметить выстрел, который совершил противник, по полю локального игрока
	 * @param cell Координаты ячейки диаграммы противника, по которой игрок сделал выстрел
	 * @param result Результат выстрела: попадание (true) или промах (false)
	 */
	markShotResult( cell: CellQN, result: boolean ): void
	{
		// TODO: ShotAnalyzer.markShot( cell, result );
	}

	/**
	 * Этот элемент загадал?
	 * @param elemNumber Периодический номер предполагаемого элемента
	 * @returns Этот ли элемент загадал игрок
	 */
	isThisElementSelected( elemNumber: number ): boolean
	{
		return this.#elementNumber === elemNumber;
	}
}



export default OB_LocalPlayer;

export type {
	OB_ILocalPlayer,
}