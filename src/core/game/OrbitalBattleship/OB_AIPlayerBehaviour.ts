import StateMachine, { IStateMachine } from "../../util/StateMachine/StateMachine";
import OB_IGameState, { GSEventData, GSStateChanging } from "./OB_GameStateInterface";
import type {ShotsAnalyzer, IDiagram, OB_IEnemy} from "./OB_EntitiesFabric";
import type { NamingContext, SGameState, ShootingContext } from "./types";

export type InitializeObject = {
	player: OB_IEnemy,
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

class OB_AIPLayerBehaviour
{
	#player: OB_IEnemy;
	/**
	 * Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	#elementSelected: boolean;

	#hasFilled: boolean;

	/** Конечный автомат, задающий поведение игрока */
	#behaviour: BehaviouralStateMachine;

	#gameState: SGameState;

	/** Анализатор выстрелов, которые выполняет текущий игрок, 
	 * исходя из результатов собственных выстрелов */
	#shotsAnalyzer: ShotsAnalyzer;

	/** Анализатор выстрелов по диаграмме текущего игрока. */
	#enemyAnalyzer: {candidates: number};

	#game: OB_IGameState;
	
	constructor( init: InitializeObject )
	{
		this.#player = init.player;
		this.#game = init.game;
		this.#elementSelected = false;
		this.#hasFilled = false;
		this.#gameState = 'preparing';
		this._bindFunctions();
		this.#behaviour = this._initBehaviouralStateMachine();
		this.#shotsAnalyzer = init.analyzer;
		this.#enemyAnalyzer = init.enemyAnalyzer;

		this._listenGame();
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
		const statesChain = (data.detail as GSStateChanging).state;
		this.#gameState = statesChain[0] as SGameState;

		if( statesChain[2] === 'choice' && !this.#elementSelected ) { // Выбор элемента

			this.#behaviour.send( 'select' );
		}
		else if( statesChain[2] === 'diagram' && !this.#hasFilled ) // Заполнение диаграммы
		{
			if( !this.#elementSelected )
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
		return this.#elementSelected;
	}


	/** Выбрать элемент (selecting) */
	private _selectElement(): void
	{
		if( this.#gameState === 'preparing'
			&& !this.#elementSelected
			&& !this.#hasFilled
		)
		{
			this.#elementSelected = true;
			this.#player.markElementSelection();
		}
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
	 * что делает Player независимым от интерфейса.
	 * @param diagram Диаграмма
	 */
	setDiagram( diagram: IDiagram ): void
	{
		this.#player.setDiagram( diagram );
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
		{	``
			this.#hasFilled = true;
			this.#player.markDiagramFilling();
		}
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
	{
		this.#game.send(
			'name',
			{
				namedElemNumber: this.#shotsAnalyzer.pickOutElement()?.number,
				target: this.#player,
			} as NamingContext
		);
	}

	private _makeShot(): void
	{
		this.#game.send(
			'shot',
			{
				shot: this.#shotsAnalyzer.pickOutCell()
			} as ShootingContext
		);
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



export default OB_AIPLayerBehaviour;