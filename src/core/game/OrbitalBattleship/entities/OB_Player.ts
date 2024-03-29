import { EventProvider } from "../../../util";
import ShotsAnalyzer from "./OB_ShotsAnalyzer";
import type { CellQN, ChemicalElement } from "../../Chemistry/types";
import type { IDiagram, IUser, IShotsAnalyzer, OB_IPlayer } from "../OB_Entities";
import type { PlayerResults, PlayerEvent, PlayerEventData } from '../types';




abstract class OB_Player extends EventProvider<PlayerEvent, PlayerEventData> implements OB_IPlayer
{
	protected _user: IUser;

	protected _shotsAnalyzer: IShotsAnalyzer;

	/**
	 * Химический элемент. 
	 * Пока не выбран, равен `null`.
	*/
	protected _element: ChemicalElement | null;

	/**
	 * Диаграмма игрока.
	 * Изначально равна `null`.
	 * Чтобы начать заполнение диаграммы, необходимо её инициализировать.
	 * Диаграмма сразу не инициализируется, чтобы иметь возможность её создать снаружи,
	 * предоставив доступ к ней UI-компонентам.
	*/
	protected _diagram: IDiagram | null;

	/** Играет ли игрок.
	 * После того, как переменная примет значение false, игровые методы перестанут работать.
	 */
	protected _isPlaying: boolean;


	constructor( user: IUser )
	{
		super();
		this._user = user;
		this._element = null;
		this._diagram = null;
		this._isPlaying = true;
		this._shotsAnalyzer = new ShotsAnalyzer();
	}

	abstract isThisElementSelected(elemNumber: number): boolean | Promise<boolean>;

	get shotsAnalyzer(): IShotsAnalyzer
	{
		return this._shotsAnalyzer;
	}

	get hasSelectedElement(): boolean
	{
		return this._element !== null;
	}

	get diagram(): IDiagram | null
	{
		return this._diagram;
	}

	get user(): IUser
	{
		return this._user;
	}

	/**
	 * Был ли совершен выстрел по ячейке диаграммы игрока
	 * @param cell Координаты ячейки диаграммы игрока
	 * @returns Наличие выстрела в ячейку диаграммы игрока
	 */
	hasShot( cell: CellQN ): boolean
	{
		return this._diagram?.observableState.isDamaged( cell ) || false;
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
		this._diagram = diagram;
	}

	markShotResult( cell: CellQN, result: boolean ): void
	{
		this._shotsAnalyzer.markShot( cell, result );
		this._emit( 'shot', { cell, result } );
	}

	finishGame(): void
	{
		this._isPlaying = false;
	}

	getResults(): PlayerResults | undefined
	{
		return this._isPlaying 
				? undefined
				: {
					elemNumber: this._element ? this._element.number : 0,
					certainty: this._shotsAnalyzer.certainty,
					steps: this._shotsAnalyzer.shots,
				};
	}
}



export default OB_Player;

export type {
	PlayerResults,
}