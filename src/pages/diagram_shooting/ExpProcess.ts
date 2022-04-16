import { makeAutoObservable, observable } from "mobx";
import { storage, achievements, browser } from "../../core/core";
import TimeOnPage from "./TimeOnPage";
import type { TaskerEventData, TaskResult } from "./Tasker/types.d";
import type { TaskKey } from "./ExpProcess.d";

class UserAssessments
{
	values: {[key: string]: number};


	constructor()
	{
		makeAutoObservable( this );

		this.values = observable({
			satisfaction: 0,
			difficulty: 0,
		});

		this.set = this.set.bind( this );
		this.set = this.set.bind( this );
	}

	get( name: string ): number
	{
		return this.values[ name ] || 0;
	}

	set( name: string, value: number ): void
	{
		this.values[ name ] = value;
	}
}

enum Variant {
	lesson,
	game
};



class ExpProcess
{
	/** Вариант сессии (0 – урок, 1 – игра) */
	variant: Variant;

	/** Оценки пользователей */
	assessments: UserAssessments;

	/** ID сессии */
	#id: number;

	/** Последнее открытое окно */
	#checkPoint: string;

	/** Пользователь сыграл хотя бы одну дополнительную игру */
	#hasPlayed: boolean;

	/** Пользователь перешел на этап игры */
	#wishToPlay: boolean;

	/** Пользователь перешел на этап игры */
	#hasFinished: boolean;

	/** Результаты выполненных заданий */
	#tasks: {[key in TaskKey]: TaskResult[]};
	#gameTasks: TaskResult[][];

	/** Объект, отслеживающий время проведенное на странице и за ее пределами */
	#timer: TimeOnPage = new TimeOnPage();


	constructor()
	{
		this.variant = this._loadVariant();
		this.assessments = this._loadAssessments();

		this.#id = this._loadId();
		this.#checkPoint = this._loadCheckpointURL();
		this.#hasPlayed = this._loadPlayStatus();
		this.#wishToPlay = this._loadWishToPlay();
		this.#hasFinished = this._loadFinishStatus();
		
		this.#tasks = this._createTaskStore();
		this.#gameTasks = [];

		this.send = this.send.bind( this );
		this.toURL = this.toURL.bind( this );
		this.finish = this.finish.bind( this );

		achievements.initialize( this._loadAchievements() );

		browser.onTabClose( this.send );

		this._sendToMetrics( {
			'event': 'session_start',
			'variant': this.variant + 1
		});
	}

	/** Загрузить ID сессии. */
	private _loadId(): number
	{
		let id = storage.getAsInt( 'id' );
		if( !id )
		{
			id = this._generateID();
			storage.setPrimitive( 'id', id );
		}
		return id;
	}

	/** Сгенерировать 8-значное число [10 000 000 ; 99 999 999] */
	private _generateID(): number
	{
		return Math.floor( Math.random() * 89999999 + 10000000 );
	}

	/**
	 * Загрузить из хранилища вариант сессии. 
	 * 
	 * Значение может быть равно `1` (без геймификации) и `2` (в виде игры).
	 * @returns Вариант текущей сессии (1|2)
	 */
	private _loadVariant(): number
	{
		let variant = storage.getAsInt( 'variant' );
		if( !variant )
		{
			variant = this._generateVariant();
			storage.setPrimitive( 'variant', variant + 1 );
			return variant;
		}
		return variant - 1;
		// return Math.round( Math.random() );
	}

	private _generateVariant(): Variant
	{
		return Math.round( Math.random() );
	}

	/**
	 * Загрузить оценки, выставленные пользователем
	 * 
	 * @returns Объект пользовательских оценок
	 */
	private _loadAssessments(): UserAssessments
	{
		type AssessmentsObject = {
			satisfaction?: number,
			difficulty?: number,
		}
		const assessmentsInit: AssessmentsObject = storage.getAsObject( 'assessments' );
		if( Object.keys(assessmentsInit).length === 0 )
		{
			storage.setObject( 'assessments', {satisfaction: 0, difficulty: 0} );
			return new UserAssessments();
		}
		const assessments = new UserAssessments();
		assessments.set( 'satisfaction', assessmentsInit.satisfaction || 0 );
		assessments.set( 'difficulty', assessmentsInit.difficulty || 0 );
		return assessments;
	}

	/**
	 * Адрес последней посещенной страницы, которую можно загрузить
	 * @returns Адрес последнего посещенного модального окна
	 */
	private _loadCheckpointURL(): string
	{
		let windowURL = storage.getAsString( 'url' );
		if( !windowURL )
		{
			windowURL = '/';
			storage.setPrimitive( 'url', windowURL );
		}
		return windowURL;
	}

	/**
	 * Загрузить достигнутый уровень и полученные баллы
	 * @returns Объект для инициализации системы достижений
	 */
	private _loadAchievements(): {level: number, score: number}
	{
		let level = storage.getAsInt( 'level' );
		const score = storage.getAsInt( 'score' );

		if( !level )
		{
			storage.setPrimitive( 'level', 1 );
			storage.setPrimitive( 'score', 0 );
			level = 1;
		}

		return {
			level,
			score,
		};
	}

	private _loadWishToPlay(): boolean
	{
		return storage.getAsBoolean( 'wishToPlay' );
	}

	private _loadPlayStatus(): boolean
	{
		return storage.getAsBoolean( 'hasPlayed' );
	}

	private _loadFinishStatus(): boolean
	{
		return storage.getAsBoolean( 'hasFinished' );
	}

	private _createTaskStore()
	{
		return {
			'n': [],
			'l': [],
			'm': [],
			's': [],
			'combinations': [],
			'training': [],
		};
	}


	send(): void
	{
		this._save();
		this._sendOnServer();
	}

	private _sendOnServer(): void
	{
		browser.sendInBackground( window.location.protocol + '//battleship.itmo.ru/results.php', this._prepareDataForRequest() );
	}

	private _sendToMetrics( data: object ): void
	{
		(window as any).dataLayer.push( data );
	}

	/** Создать объект для отправки на сервер */
	private _prepareDataForRequest(): FormData
	{
		const request = new FormData();

		request.append( 'id', this.#id.toString() );
		request.append( 'var', (this.variant + 1).toString() );
		request.append( 'score', achievements.score.toString() );
		request.append( 'level', achievements.level.toString() );
		request.append( 'a1', this.assessments.get( 'satisfaction' ).toString() );
		request.append( 'a2', this.assessments.get( 'difficulty' ).toString() );
		request.append( 'bWish', this.#wishToPlay ? '1' : '0' );
		request.append( 'bGame', this.#hasPlayed ? '1' : '0' );
		request.append( 'onPage', this.#timer.timeOnPage.toString() );
		request.append( 'outPage', this.#timer.timeOutOfPage.toString() );
		request.append( 'startT', this.#timer.sessionStartTime.getTime().toString() );
		request.append( 'endT', Date.now().toString() );
		request.append( 'away', this.#timer.absences.toString() );

		const tasks = this._taskResultsToArrays();
		request.append( 'res', tasks.results.join( ';' ) );
		request.append( 'dur', tasks.duration.join( ';' ) );
		request.append( 'atmp', tasks.attempts.join( ';' ) );
		
		if( this.#gameTasks.length > 0 )
			request.append( 'game', this._gameResultsToArray().join( ';' ) );
		return request;
	}

	private _taskResultsToArrays()
	{
		type StringResults = {[key in 'results'|'duration'|'attempts']: string[]}
		const res: StringResults = {
			results: [],
			duration: [],
			attempts: [],
		};

		function addResults( task: TaskResult[], expectedLength: number ): void
		{
			if( task.length === 0 )
				for (let i = 0; i < expectedLength; i++) {
					res.results.push( '-1' );
					res.duration.push( '-1' );
					res.attempts.push( '-1' );
				}
			else
				task.forEach( ( value ) => {
					res.results.push( value.result ? '1' : '0' );
					res.duration.push( value.duration.toString() );
					res.attempts.push( value.attempts.toString() );
				} );
		}

		addResults( this.#tasks.n, 1 );
		addResults( this.#tasks.l, 1 );
		addResults( this.#tasks.m, 1 );
		addResults( this.#tasks.s, 1 );
		addResults( this.#tasks.combinations, 5 );
		addResults( this.#tasks.training, 5 );

		return res;
	}

	private _gameResultsToArray()
	{
		const res: string[] = [];
		this.#gameTasks.forEach( ( sequence ) => {
			sequence.forEach( ( task ) => {
				res.push( `${task.result?1:0};${task.duration}` );
			});
		} );

		return res;
	}

	private _save(): void
	{
		storage.setObject(
			'assessments',
			{
				satisfaction: this.assessments.get( 'satisfaction' ),
				difficulty: this.assessments.get( 'difficulty' ),
			}
		);

		storage.setPrimitive( 'url', this.#checkPoint );
		storage.setPrimitive( 'hasPlayed', this.#hasPlayed );
		storage.setPrimitive( 'wishToPlay', this.#wishToPlay );
		storage.setPrimitive( 'level', achievements.level );
		storage.setPrimitive( 'score', achievements.score );
	}



	get checkPoint(): string
	{
		return this.#checkPoint;
	}
	
	addTaskResults( key: TaskKey|'game', results: TaskerEventData ): void
	{
		this._sendToMetrics( {
			event: 'task_results',
			correct: results.right,
			duration: results.duration / 1000,
		} );

		if( key === 'game' )
		{
			this.#gameTasks.push( results.results );
			return;
		}

		const task: TaskResult[] | undefined = this.#tasks[ key ];
		if( task && task.length === 0 )
			this.#tasks[ key ] = results.results;
	}

	newSession(): void
	{
		this.variant = ( this.variant + 1 ) % 2;
		this.assessments = new UserAssessments();

		this.#id = this._generateID();
		this.#checkPoint = '/';
		this.#hasPlayed = false;
		this.#wishToPlay = false;
		this.#hasFinished = false;
		
		this.#tasks = this._createTaskStore();
		this.#gameTasks = [];

		achievements.initialize({ level: 1, score: 0 });

		storage.setPrimitive( 'id', this.#id );
		storage.setPrimitive( 'variant', this.variant + 1 );
		storage.setObject( 'assessments', {satisfaction: 0, difficulty: 0} );
		storage.setPrimitive( 'level', 1 );
		storage.setPrimitive( 'score', 0 );
		storage.setPrimitive( 'wishToPlay', false );
		storage.setPrimitive( 'hasPlayed', false );
		storage.setPrimitive( 'hasFinished', false );

		this._sendToMetrics( {
			'event': 'new_session',
			'variant': this.variant + 1
		});
	}

	/**
	 * Учет перехода на следующую страницу
	 * 
	 * Вызывается ExpPage только для окон
	 * @param url Куда произошел переход
	 * @param nextURL Следующая страница перехода по нажатию главную кнопку окна
	 */
	toURL( url: string, nextURL: string ): void
	{
		const isResultWindow = url.match( /.+\/r(\/.+)*/ ) !== null;
		this.#checkPoint = isResultWindow ? nextURL : url;

		const isGame = url.includes( 'game' );
		this.#wishToPlay = this.#wishToPlay || isGame;
		this.#hasPlayed = this.#hasPlayed || (isGame && isResultWindow);
		console.log('toURL');

		this._save();
	}

	finish()
	{
		if( !this.#hasFinished )
		{
			this._sendToMetrics( {
				event: 'end_'+( this.variant+1 )+'_variant',
				satisfaction: this.assessments.get( 'satisfaction' ),
				difficulty: this.assessments.get( 'difficulty' ),
				on_page: this.#timer.timeOnPage / 1000,
			} );
			this.#hasFinished = true;
		}
		this._save();
		this._sendOnServer();
	}
}



const process = new ExpProcess();

export default process;