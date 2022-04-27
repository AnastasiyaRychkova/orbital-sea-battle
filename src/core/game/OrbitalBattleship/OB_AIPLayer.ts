import { CellQN, periodicTable } from '../Services/Chemistry';
import OB_IEnemy from "./OB_EnemyInterface";
import OB_Player, { InitializeObject } from './OB_Player';


class OB_AIPLayer extends OB_Player implements OB_IEnemy
{
	#hasFilled: boolean;

	#steps: number;
	
	constructor( init: InitializeObject )
	{
		super( init );
		this.#hasFilled = false;
		this.#steps = 0;
	}

	/**
	 * Спросить, переданный ли элемент загадал игрок
	 * @param elemNumber Номер предполагаемого элемента
	 */
	isThisElementSelected( elemNumber: number ): Promise<boolean>
	{
		if( !this.element )
			return new Promise( resolve => resolve(false) );

		return new Promise( resolve => resolve( this.element!.number === elemNumber ) );
	}

	/** Выбран ли какой-то элемент */
	get hasSelectedElement(): boolean
	{
		return this.element !== null;
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
		if( !this.element )
			return false;

		const index = periodicTable.converter.toIndex( cell );
		if( index === undefined )
			return false;


		const shotResult = this.element.config.hasSpin( index );
		if( shotResult )
			this.diagram?.setSpin( cell, true );
		this.diagram?.fire( cell );

		return shotResult;
	}

	markElementSelection(): void
	{
		if( this.element )
			return;

		this.element = periodicTable.random();
	}

	markDiagramFilling(): void
	{
		this.#hasFilled = true;
	}

}




export default OB_AIPLayer;