import { CellQN, ChemicalElement, periodicTable } from '../Services/Chemistry';
import type {User, ShotsAnalyzer, IDiagram, OB_IEnemy} from "./OB_EntitiesFabric";

export type InitializeObject = {
	user: User,
	analyzer: ShotsAnalyzer,
};


class OB_AIPLayer implements OB_IEnemy
{
	#user: User;

	/**
	 * Химический элемент. 
	 * Пока не выбран, равен `null`.
	*/
	#element: ChemicalElement | null;

	#hasFilled: boolean;

	#diagram?: IDiagram;

	#shotsAnalyzer: ShotsAnalyzer;
	
	constructor( init: InitializeObject )
	{
		this.#user = init.user;
		this.#element = null;
		this.#hasFilled = false;
		this.#shotsAnalyzer = init.analyzer;
	}

	
	isThisElementSelected(elemNumber: number): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	/** Выбран ли какой-то элемент */
	get hasSelectedElement(): boolean
	{
		return this.#element !== null;
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

	/** Заполнена ли правильно диаграмма */
	get hasFilled(): boolean
	{
		return this.#hasFilled;
	}
	/**
	 * Отметить выстрел соперника на диаграмме игрока.
	 * Диаграмма инициирует событие `shot`.
	 * @param cell Ячейка диаграммы, в которую стреляют
	 */
	async markEnemyShot( cell: CellQN ): Promise<boolean>
	{
		if( !this.#element )
			return false;

		const index = periodicTable.converter.toIndex( cell );
		if( index === undefined )
			return false;


		const shotResult = this.#element.config.hasSpin( index );
		if( shotResult )
			this.#diagram?.setSpin( cell, true );
		this.#diagram?.fire( cell );
		this.#shotsAnalyzer.markShot( cell, shotResult );

		return shotResult;
	}

	markShotResult( cell: CellQN, result: boolean ): void
	{
		this.#shotsAnalyzer.markShot( cell, result );
	}

	markElementSelection(): void
	{
		if( this.#element )
			return;

		this.#element = periodicTable.element( Math.round( randomInRange( 1, periodicTable.MAX_ELEM_NUMBER ) ) );
	}

	markDiagramFilling(): void
	{
		this.#hasFilled = true;
	}
}


function randomInRange( from: number, to: number ): number
{
	return (to - from) * Math.random() + from;
}



export default OB_AIPLayer;