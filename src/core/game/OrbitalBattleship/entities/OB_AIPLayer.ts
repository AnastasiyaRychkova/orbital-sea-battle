import { CellQN, periodicTable } from '../../Services/Chemistry';
import OB_Player from './OB_Player';
import type OB_IEnemy from "../interfaces/OB_EnemyInterface";
import type { User } from '../OB_Entities';


class OB_AIPLayer extends OB_Player implements OB_IEnemy
{
	#hasFilled: boolean;
	
	constructor( user: User )
	{
		super( user );
		this.#hasFilled = false;
	}

	/**
	 * Спросить, переданный ли элемент загадал игрок
	 * @param elemNumber Номер предполагаемого элемента
	 */
	isThisElementSelected( elemNumber: number ): Promise<boolean>
	{
		if( !this._element )
			return new Promise( resolve => resolve(false) );

		return new Promise( resolve => resolve( this._element!.number === elemNumber ) );
	}

	/** Выбран ли какой-то элемент */
	get hasSelectedElement(): boolean
	{
		return this._element !== null;
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
		if( !this._element )
			return false;

		const index = periodicTable.converter.toIndex( cell );
		if( index === undefined )
			return false;


		const shotResult = this._element.config.hasSpin( index );
		if( shotResult )
			this._diagram?.setSpin( cell, true );
		this._diagram?.fire( cell );

		return shotResult;
	}

	markElementSelection(): void
	{
		if( this._element )
			return;

		this._element = periodicTable.random();
		this._emit( 'selection' );
	}

	markDiagramFilling(): void
	{
		this.#hasFilled = true;
		this._emit( 'filling' );
	}

	requestRematch(): Promise<boolean>
	{
		return new Promise( resolve => resolve(true) );
	}

}




export default OB_AIPLayer;