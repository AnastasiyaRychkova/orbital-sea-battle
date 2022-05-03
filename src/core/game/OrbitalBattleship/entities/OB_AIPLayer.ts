import { CellQN, periodicTable } from '../../Services/Chemistry';
import OB_Player from './OB_Player';
import OB_IEnemy from "../interfaces/OB_EnemyInterface";
import type { User } from '../OB_Entities';
import { PlayerEvent, PlayerEventData } from '../types';


class OB_AIPLayer extends OB_Player<PlayerEvent, PlayerEventData> implements OB_IEnemy
{
	#hasFilled: boolean;

	#steps: number;
	
	constructor( user: User )
	{
		super( user );
		this.#hasFilled = false;
		this.#steps = 0;
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
	}

	markDiagramFilling(): void
	{
		this.#hasFilled = true;
	}

}




export default OB_AIPLayer;