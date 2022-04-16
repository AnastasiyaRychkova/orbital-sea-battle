import StateMachine, { IStateMachine } from "../../util/StateMachine/StateMachine";
import { CellQN, ChemicalElement, periodicTable } from '../Services/Chemistry';
import OB_IGameState, { GSEventData } from "./OB_GameStateInterface";
import type {User, ShotsAnalyzer, IDiagram, OB_IEnemy} from "./OB_EntitiesFabric";
import type { SGameState } from "./types";

export type InitializeObject = {
	user: User,
	game: OB_IGameState,
	analyzer: ShotsAnalyzer,
	enemyAnalyzer: {candidates: number},
};

type BehaviourState = 'waiting'
						| 'filling'
						| 'selecting'
						| 'moving';

type BehaviourEvent = 'select'
						| 'fill'
						| 'move'
						| 'finish';

type BehaviouralStateMachine = IStateMachine<BehaviourState, BehaviourEvent>;

class AIPLayer implements OB_IEnemy
{
	#user: User;

	/**
	 * Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	#element: ChemicalElement | null;

	#hasFilled: boolean;

	/** Конечный автомат, задающий поведение игрока */
	#behaviour: BehaviouralStateMachine;

	#gameState: SGameState;

	#diagram?: IDiagram;

	#shotsAnalyzer: ShotsAnalyzer;

	#enemyAnalyzer: {candidates: number};

	#game: OB_IGameState;
	
	constructor( init: InitializeObject )
	{
		this.#user = init.user;
		this.#game = init.game;
		this.#element = null;
		this.#hasFilled = false;
		this.#gameState = 'preparing';
		this._bindFunctions();
		this.#behaviour = this._initBehaviouralStateMachine();
		this.#shotsAnalyzer = init.analyzer;
		this.#enemyAnalyzer = init.enemyAnalyzer;

		this._listenGame();
	}

	
	isThisElementSelected(elemNumber: number): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	private _bindFunctions(): void
	{
		this._gameStateChangeHandler = this._gameStateChangeHandler.bind( this );
		this._selectElement = this._selectElement.bind( this );
		this._fillOutDiagram = this._fillOutDiagram.bind( this );
		this._move = this._move.bind( this );
	}

	private _listenGame(): void
	{
		this.#game.on(
			'change',
			this._gameStateChangeHandler,
		);
	}

	/** Слушатель изменений состояния игры */
	private _gameStateChangeHandler( data: {detail: GSEventData} ): void
	{
		const statesChain = data.detail.state;
		this.#gameState = statesChain[0] as SGameState;

		if( statesChain[2] === 'choice' && !this.#element ) // выбор элемента
		{
			this.#behaviour.send( 'select' );
		}
		else if( statesChain[2] === 'diagram' && !this.#hasFilled ) // Заполнение диаграммы
		{
			if( !this.#element )
				this.#behaviour.runAllDelayedTransitions();
			this.#behaviour.send( 'fill' );
		}
		else if( statesChain[1] === 'enemy_waiting' ) // Ход противника
		{
			this.#behaviour.send( 'move' );
		}
	}

	/** Выбран ли какой-то элемент */
	get hasSelectedElement(): boolean
	{
		return this.#element !== null;
	}


	/** Выбрать элемент (selecting) */
	private _selectElement(): void
	{
		if( this.#gameState === 'preparing' && !this.#hasFilled )
			this.#element = periodicTable.element( Math.round( randomInRange( 1, 118 ) ) );
	}


	/**
	 * @private Поведенческое состояние игрока
	 */
	get _state(): BehaviourState
	{
		return this.#behaviour.state;
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

	/** Обозначить, что диаграмма заполнена (filling) */
	private _fillOutDiagram(): void
	{
		if( this.#gameState === 'preparing' )
			this.#hasFilled = true;
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

	private _move(): void
	{
		if( this._decidedToNameElement() )
			this._nameElement();
		else
			this._makeShot();
	}

	private _decidedToNameElement(): boolean
	{
		const candidates = this.#shotsAnalyzer.candidates;
		if( candidates === 1 )
			return true;

		const enemyCandidates = this.#enemyAnalyzer.candidates;
		return Math.random() <= (1/(candidates**2) + 1/((enemyCandidates+1)**2));
	}

	private _nameElement(): void
	{ // TODO: AI_Player -> _nameElement
		throw new Error("Method not implemented.");
	}

	private _makeShot(): void
	{ // TODO: AI_Player -> _makeShot
		throw new Error("Method not implemented.");
	}




	/** Инициализация графа поведения */
	private _initBehaviouralStateMachine(): BehaviouralStateMachine
	{
		return new StateMachine<BehaviourState, BehaviourEvent>( {
			initial: 'waiting',
			states: {
				waiting: {
					on: {
						select: 'selecting',
						fill: 'filling',
						move: 'moving',
					},
				},
				selecting: {
					delay: {
						to: 'waiting',
						after: randomInRange( 1, 5 ),
						do: this._selectElement,
					},
					on: {
						finish: 'waiting',
					},
				},
				filling: {
					delay: {
						to: 'waiting',
						after: randomInRange( 1, 5 ),
						do: this._fillOutDiagram,
					},
					on: {
						finish: 'waiting',
					},
				},
				moving: {
					delay: {
						to: 'waiting',
						after: randomInRange( 0.4, 1 ),
						do: this._move,
					},
					on: {
						finish: 'waiting',
					},
				}
			}
		} )
	}
}


function randomInRange( from: number, to: number ): number
{
	return (to - from) * Math.random() + from;
}



export default AIPLayer;