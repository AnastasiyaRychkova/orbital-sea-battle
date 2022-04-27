import EventProvider from "../../util/EventEmitter/EventProvider";
import type { CellQN, ChemicalElement } from "../Services/Chemistry";
import type { IDiagram, ShotsAnalyzer, User } from "./OB_EntitiesFabric";


export type InitializeObject = {
	user: User,
	analyzer: ShotsAnalyzer,
};

export type PlayerResults = {
	elemNumber: number,
	steps: number,
	certainty: number,
};


class OB_Player extends EventProvider<string, object>
{
	protected user: User;

	protected shotsAnalyzer: ShotsAnalyzer;

	/**
	 * Химический элемент. 
	 * Пока не выбран, равен `null`.
	*/
	protected element: ChemicalElement | null;

	/**
	 * Диаграмма игрока.
	 * Изначально равна `null`.
	 * Чтобы начать заполнение диаграммы, необходимо её инициализировать.
	 * Диаграмма сразу не инициализируется, чтобы иметь возможность её создать снаружи,
	 * предоставив доступ к ней UI-компонентам.
	*/
	protected diagram: IDiagram | null;

	/** Играет ли игрок.
	 * После того, как переменная примет значение false, игровые методы перестанут работать.
	 */
	protected isPlaying: boolean;


	constructor( init: InitializeObject )
	{
		super();
		this.user = init.user;
		this.shotsAnalyzer = init.analyzer;
		this.element = null;
		this.diagram = null;
		this.isPlaying = true;
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
		this.diagram = diagram;
	}

	markShotResult( cell: CellQN, result: boolean ): void
	{
		this.shotsAnalyzer.markShot( cell, result );
	}

	finishGame(): void
	{
		this.isPlaying = false;
	}

	getResults(): PlayerResults | undefined
	{
		return this.isPlaying 
				? undefined
				: {
					elemNumber: this.element ? this.element.number : 0,
					certainty: this.shotsAnalyzer.certainty,
					steps: this.shotsAnalyzer.shots,
				};
	}
}



export default OB_Player;