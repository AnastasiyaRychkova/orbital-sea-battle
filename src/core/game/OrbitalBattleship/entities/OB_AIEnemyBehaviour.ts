import { randomInRange, StateMachine } from "../../../util";
import OB_IGameState, { GSEventData, GSStateChanging } from "../interfaces/OB_GameStateInterface";
import type { IStateMachine } from "../../../util/types";
import type {IShotsAnalyzer, IDiagram, OB_IEnemy} from "../OB_Entities";
import type { NamingContext, ShootingContext } from "../types";

export type InitializeObject = {
	player: OB_IEnemy,
	game: OB_IGameState,
	analyzer: IShotsAnalyzer,
	enemyAnalyzer: IShotsAnalyzer,
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

class OB_AIEnemyBehaviour
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

	/** Анализатор выстрелов, которые выполняет текущий игрок, 
	 * исходя из результатов собственных выстрелов */
	#shotsAnalyzer: IShotsAnalyzer;

	/** Анализатор выстрелов по диаграмме текущего игрока. */
	#enemyAnalyzer: {candidates: number};

	#game: OB_IGameState;
	
	constructor( game: OB_IGameState )
	{
		this.#game = game;
		this.#player = game.enemy;
		this.#elementSelected = false;
		this.#hasFilled = false;
		this._bindFunctions();
		this.#behaviour = this._initBehaviouralStateMachine();
		this.#shotsAnalyzer = game.enemy.shotsAnalyzer;
		this.#enemyAnalyzer = game.player.shotsAnalyzer;

		this._listenGame();
	}


	private _bindFunctions(): void
	{
		this._gameStateChangeHandler = this._gameStateChangeHandler.bind( this );
		this._selectElement = this._selectElement.bind( this );
		this._fillOutDiagram = this._fillOutDiagram.bind( this );
		this._move = this._move.bind( this );
		this._reset = this._reset.bind( this );
	}

	private _listenGame(): void
	{
		this.#game.on(
			'change',
			this._gameStateChangeHandler,
		);

		this.#game.on( 'new', this._reset );
	}

	/** Слушатель изменений состояния игры */
	private _gameStateChangeHandler( data: {detail: GSEventData} ): void
	{
		const statesChain = (data.detail as GSStateChanging).state;

		if( statesChain[1] === 'enemy_waiting' ) // Ход противника
		{
			this.#behaviour.send( 'move' );
			return;
		}

		if( statesChain.length < 2 )
			return;

		switch( statesChain[2] )
		{
			case 'choice':
				this.#behaviour.send( 'select' );
				break;

			case 'diagram':
				if( !this.#elementSelected )
					this.#behaviour.runAllDelayedTransitions();
				this.#behaviour.send( 'fill' );
				break;

			case 'correct':
				if( !this.#hasFilled )
					this.#behaviour.runAllDelayedTransitions();
				break;
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
		if( !this.#elementSelected
			&& !this.#hasFilled
		) {
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
		if( this.#elementSelected
			&& !this.#hasFilled
		) {
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
			'enemy_name',
			{
				namedElemNumber: this.#shotsAnalyzer.pickOutElement()?.number,
				target: this.#player,
			} as NamingContext
		);
	}

	private _makeShot(): void
	{
		this.#game.send(
			'enemy_shot',
			{
				shot: this.#shotsAnalyzer.pickOutCell()
			} as ShootingContext
		);
	}

	private _reset(): void
	{
		this.#player = this.#game.enemy;
		this.#shotsAnalyzer = this.#player.shotsAnalyzer;
		this.#enemyAnalyzer = this.#game.player.shotsAnalyzer;

		this.#elementSelected = false;
		this.#hasFilled = false;
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
						after: randomInRange( 1, 2 ),
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



export default OB_AIEnemyBehaviour;