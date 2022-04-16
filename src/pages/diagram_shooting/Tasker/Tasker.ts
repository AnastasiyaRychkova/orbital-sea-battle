import { makeAutoObservable } from "mobx";
import {achievements} from '../../../core/core';
import EventProvider from "../../../core/util/EventEmitter/EventProvider";
import { TaskConfig, EventType, TaskResult, TaskerEvent, TaskerEventData, Digest, Timestamp } from "./types";

type DigestStore = {
	markCompletion: ( result: boolean ) => void,
	endExecution: () => void,
}&Digest;

/**
 * Контроллер процесса выполнения задания.
 * 
 * Следить начинает сразу после создания. По окончании выполнения инициирует событие `complete`.
 */
class Tasker<TaskScheme, EventData> extends EventProvider<TaskerEvent, TaskerEventData>
{
	/** Информация о заданиях */
	#scheme: TaskConfig<TaskScheme, EventData>;

	/** Индекс текущего задания */
	#currentIndex: number = 0;

	/** Время начала выполнения текущей задачи */
	#startTime: Timestamp = 0;

	/** Собранные метрики и результаты */
	#results: TaskResult[] = [];

	/** Коэффициент на который умножается бонус за время по окончании выполнения всего задания */
	#timeBonusCoef: number = 0;

	/** Информация о текущем состоянии процесса выполнения задания */
	digest: DigestStore;

	constructor( config: TaskConfig<TaskScheme, EventData> )
	{
		super();
		this.#scheme = config;
		this._startTask = this._startTask.bind( this );
		this._taskCompleteHandler = this._taskCompleteHandler.bind( this );

		this.digest = this._createDigestObject();
		this._startTask();

		this.#scheme.target.on(
			this.#scheme.event,
			this._taskCompleteHandler
		);
	}

	private _createDigestObject(): DigestStore
	{
		return makeAutoObservable({
			total: this.#scheme.tasks.length,
			right: 0,
			completed: 0,
			done: false,
			startTime: Date.now(),

			markCompletion( result: boolean ) {
				this.completed++;
				result && this.right++;
			},

			endExecution() {
				this.done = true;
			},
		} as DigestStore);
	}

	private _startTask(): void
	{
		if( this.#currentIndex === this.#scheme.tasks.length )
		{
			this.digest.endExecution();
			return;
		}
	
		this.#results.push({
			duration: 0,
			attempts: 0,
			result: false,
		});
		this.#startTime = Date.now();

		this.#scheme.entry( this._currentTask );
	}

	private get _currentTask(): TaskScheme
	{
		return this.#scheme.tasks[ this.#currentIndex];
	}

	private get _currentResult(): TaskResult
	{
		return this.#results[ this.#currentIndex ];
	}

	private _taskCompleteHandler = ( { detail }: EventType<EventData> ) => {
		const result: boolean = this.#scheme.checker(
			detail,
			this._currentTask
		);

		this._currentResult.attempts++;

		if( result || this.#scheme.infallibility )
			this._finishTask( result );
	}

	private _finishTask( result: boolean ): void
	{
		const totalDuration = Date.now() - this.digest.startTime;
		const task = this._currentResult;
		task.duration = Date.now() - this.#startTime;
		task.result = result;

		this.#scheme.exit();

		this._markTaskCompetition( result, totalDuration );

		if( this.#currentIndex >= this.#scheme.tasks.length )
		{
			achievements.receive( (this.#scheme.bonusCost || 0) * this.#timeBonusCoef );
			this.#scheme.target.remove(
				this.#scheme.event,
				this._taskCompleteHandler
			);
			this._emit(
				'complete',
				{
					results: this.#results,
					total: this.digest.total,
					right: this.digest.right,
					duration: totalDuration,
				}
			);
		}

		setTimeout(
			this._startTask,
			this.#scheme.delay,
		);
	}

	private _markTaskCompetition( result: boolean, duration: Timestamp ): void
	{
		this.#startTime = 0;
		this.#currentIndex++;
		this.digest.markCompletion( result);

		if( result )
		{
			achievements.receive( this.#scheme.cost || 0 );
			this.#timeBonusCoef += this._countTimeBonus( duration );
		}
	}

	private _countTimeBonus( duration: Timestamp ): number
	{
		return !this.#scheme.bonusTime || duration > this.#scheme.bonusTime
					? 0
					: -1 * (duration / this.#scheme.bonusTime) + 1;
	}
}



export default Tasker;