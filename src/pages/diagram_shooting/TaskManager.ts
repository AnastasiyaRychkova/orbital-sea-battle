import { CellQN } from "../../lib/game/ChemicalElement/QuantumNumbers";
import IDiagram, { DiagramEventData } from "../../lib/game/Diagram/DiagramInterface";
import IFilter from "../../lib/game/Diagram/Filter/FilterInterface";
import { StateMachine } from "../../lib/util/StateMachine/StateMachine";
import IEventEmitter from "../../lib/util/EventEmitter/EventEmitterInterface";
import EnvEventEmitter from "../../lib/util/EventEmitter/EventEmitter";
import ITaskManager from "./TaskManagerInterface";
import { Index } from "./types";
import { EDiagramCellState } from "../../lib/game/ChemicalElement/DiagramCell";

type EventName = | 'start'
				 | 'correct'
				 | 'error'
				 | 'finish';

type StateName = | 'waiting'
				 | 'task'
				 | 'hit'
				 | 'miss';

/**
 * Генерируемые события TaskManager'ом
 * 
 * Событие 		| Описание
 * ------- 		| ---------------------------------------
 * __startTask__ | Генерируется перед началом выполнения нового задания, но после приведения системы к нужному состоянию. Передается `TaskBlockEventData`.
 * __endTask__ 	| Генерируется после окончания выполнения задания. Передается `TaskResultEventData`.
 * __end__ 		| Генерируется после выполнения всех заданий. Не совпадает с `endTask` из-за задержки для отображения результата последнего задания. Передается `TaskBlockEventData`.
 */
export type TaskManagerEvent = | 'startTask'
							   | 'endTask'
							   | 'end';

export type TaskBlockEventData = {
	complete: number,
	total: number,
}

export type TaskResultEventData = {
	correct: boolean,
} & TaskBlockEventData;

export type TaskManagerEventData = {
	complete: number,
	total: number,
	correct?: boolean,
};




class TaskManager implements ITaskManager<CellQN>
{
	state: StateName;

	private _tasks: CellQN[];
	private _tasksResults: boolean[];
	private _currentIndex: Index;
	private _stateMachine: StateMachine<StateName, EventName>;
	private _emitter: IEventEmitter;

	constructor( readonly diagram: IDiagram, readonly filter: IFilter )
	{
		this._tasks = [];
		this._tasksResults = [];
		this._currentIndex = -1;
		this._emitter = new EnvEventEmitter();
		this.startTask = this.startTask.bind( this );

		this._stateMachine = this._createStatesStructure();
		this.state = this._stateMachine.value;
	}

	private _createStatesStructure(): StateMachine<StateName, EventName>
	{
		return new StateMachine<StateName, EventName>( {
			initial: 'waiting',
			states: {
				waiting: {
					on: {
						start: 'task',
					}
				},
				task: {
					on: {
						correct: 'hit',
						error: 'miss',
						finish: 'waiting'
					},
					entry: this.startTask,
				},
				hit: {
					delay: {
						after: 0.8,
						to: 'task',
					}
				},
				miss: {
					delay: {
						after: 0.8,
						to: 'task',
					}
				},
			}
		} );
	}

	setTasksSequence( tasks: CellQN[] ): void
	{
		if( tasks.length === 0 )
			return;


		this._tasks = tasks;
		this._tasksResults = [];
		this._currentIndex = 0;
		this._nextState( 'start' );
	}

	private _getBlockData(): TaskBlockEventData
	{
		return {
			complete: this._currentIndex,
			total: this._tasks.length,
		};
	}

	private _nextState( event: EventName ): void
	{
		this.state = this._stateMachine.send( event ) as StateName;
	}

	private _emit( event: TaskManagerEvent, data?: TaskManagerEventData ): void
	{
		this._emitter.emit( event, data );
	}

	on( event: TaskManagerEvent, func: ( data: CustomEvent<TaskManagerEventData> ) => void ): IEventEmitter
	{
		return this._emitter.on( event, func );
	}

	once( event: TaskManagerEvent, func: ( data: CustomEvent<TaskManagerEventData> ) => void ): IEventEmitter
	{
		return this._emitter.once( event, func );
	}

	remove( event: TaskManagerEvent, func: ( data: CustomEvent<TaskManagerEventData> ) => void ): IEventEmitter
	{
		return this._emitter.remove( event, func );
	}

	startTask( state: StateName ): void
	{
		if( state as StateName !== 'task' )
			return;

		this.diagram.reset();

		if( this._currentIndex >= this._tasks.length )
		{
			this._nextState( 'finish' );
			this._emit(
				'end',
				this._getBlockData(),
			);
			return;
		}

		this.diagram.setCellState( this.currTask, true );
		this.diagram.disabled = false;
		this.diagram.on( 'shot', this.checkCompletionOfTask );
		this.filter.disabled = false;

		this._emit(
			'startTask',
			this._getBlockData(),
		);
	}

	private get currTask(): CellQN
	{
		return this._tasks[ this._currentIndex ];
	}

	checkCompletionOfTask = ( shotInfo: CustomEvent<DiagramEventData> ) => {
		const data: DiagramEventData = shotInfo.detail;
		const result = this.diagram.getCellState( data.qn as CellQN );
		this._completeTask( result === EDiagramCellState.hit );
	}

	
	private _completeTask( result: boolean ): void
	{
		this.filter.disabled = true;
		this.diagram.disabled = true;
		this._tasksResults.push( result );
		this._currentIndex++;
		this._nextState( result ? 'correct' : 'error' );

		this._emit(
			'endTask',
			{
				...this._getBlockData(),
				correct: result,
			}
		);
	}

	get results(): boolean[]
	{
		return this._tasksResults;
	}
/* 
	get completeTasks(): number
	{
		return this._currentIndex;
	}

	get totalTasks(): number
	{
		return this._tasks.length;
	} */

}



export default TaskManager;