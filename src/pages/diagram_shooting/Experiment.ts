import { makeObservable, observable, action, computed } from "mobx";

import Browser from "../../client/Browser";
import { StateMachine } from "../../lib/util/StateMachine/StateMachine";

import { Variant } from "./types";
import TaskManager, { TaskManagerEventData } from "./TaskManager";

import taskList from './Tasks';
import IMetrics from "./MetricsInterface";
import ITimer from "../../lib/util/Timer/TimerInterface";
import Timer from "../../lib/util/Timer/Timer";

export type State = | 'welcome'
					| 'interface1'
					| 'evaluating1'
					| 'interface2'
					| 'evaluating2'
					| 'final';

type Event = | '1'
			 | '2';

type Context = {
	testingInterfaceIndex: number,
}



class Experiment
{
	private readonly _taskManager: TaskManager;
	private readonly _metrics: IMetrics;
	state: State;
	completeTasks: number;
	totalTasks: number;
	lastTaskCorrectness?: boolean;
	startTestingTime: number;
	private _stateMachine: StateMachine<State, Event>;
	private _variant: Variant;
	private _timer: ITimer;

	readonly TEST_DURATION_1 = 180;
	readonly TEST_DURATION_2 = 120;
	readonly TASK_FOR_TIMING = 5;

	constructor( taskManager: TaskManager, metrics: IMetrics )
	{
		makeObservable( this, {
			state: observable,
			totalTasks: observable,
			completeTasks: observable,
			lastTaskCorrectness: observable,
			startTestingTime: observable,
			variant: computed,
			nextState: action,
			updateTasksStatistics: action,
			startTaskHandle: action,
			interfaceTestEndHandle: action,
		});

		this.startInterfaceTesting = this.startInterfaceTesting.bind( this );
		this.end = this.end.bind( this );

		this._taskManager = taskManager;
		this._metrics = metrics;

		this._variant = this._generateVariant();
		this._stateMachine = this._createStatesStructure();
		this.state = this._stateMachine.value;
		this.completeTasks = 0;
		this.totalTasks = 0;
		this.startTestingTime = 0;

		this._timer = new Timer();
	}

	private _generateVariant(): Variant
	{
		return Math.round( Math.random() + 0.75 );
	}

	private _createStatesStructure(): StateMachine<State, Event>
	{
		return new StateMachine<State, Event>({
			initial: 'welcome',
			states: {
				welcome: {
					on: {
						1: 'interface1',
						2: 'interface2',
					},
				},
				interface1: {
					on: {
						1: 'evaluating1',
						2: 'evaluating2',
					},
					entry: this.startInterfaceTesting,
				},
				evaluating1: {
					on: {
						1: 'interface2',
						2: 'interface1',
					},
				},
				interface2: {
					on: {
						1: 'evaluating2',
						2: 'evaluating1',
					},
					entry: this.startInterfaceTesting,
				},
				evaluating2: {
					on: {
						1: 'final',
						2: 'final',
					}
				},
				final: {
					on: {
						1: '__END__',
						2: '__END__',
					},
					entry: this.end,
				},
			},
			context: {
				testingInterfaceIndex: 0,
			} as Context,
		})
	}

	get variant(): number
	{
		return this._variant;
	}

	start(): void
	{
		if( this.state !== 'welcome' )
			return;
		// Browser.preventTabClose(); 
		// *************************************
		this.nextState(); // to testing first interface
	}

	nextState(): void
	{
		this.state = this._stateMachine.send( this._variant.toString() as Event ) as State;
	}

	startInterfaceTesting( _state: State, context?: object ): void
	{
		console.log( 'startInterfaceTesting', this._timer.isRunning() );
		this._metrics.reset();
		const tasks = taskList[ (context as Context).testingInterfaceIndex ];

		this._taskManager.once( 'end', this.interfaceTestEndHandle )
						 .on( 'startTask', this.startTaskHandle)
						 .on( 'endTask', this.endTaskHandle );

		this._taskManager.setTasksSequence( tasks );
		/* this._timer.start(
			this.interfaceTestEndHandle,
			(context as Context).testingInterfaceIndex ? this.TEST_DURATION_2 : this.TEST_DURATION_1
		); */

		(context as Context).testingInterfaceIndex++;
	}

	end(): void
	{
		Browser.permitTabClose();
	}

	startTaskHandle = ( event: CustomEvent<TaskManagerEventData> ) => {
		const data: TaskManagerEventData = event.detail;
		this.updateTasksStatistics( data );
		if( data.total - data.complete === this.TASK_FOR_TIMING )
			this.startTestingTime = Date.now();
		this._metrics.start();
	}

	endTaskHandle = ( event: CustomEvent<TaskManagerEventData> ) => {
		this.updateTasksStatistics( event.detail );
		this._metrics.stop();
	}

	updateTasksStatistics( data: TaskManagerEventData ): void
	{
		this.completeTasks = data.complete;
		this.totalTasks = data.total;
		this.lastTaskCorrectness = data.correct;
	}

	interfaceTestEndHandle = () => {
		this._metrics.stop();
		this._timer.stop();
		this.lastTaskCorrectness = undefined;
		this.startTestingTime = 0;
		console.log( this._metrics.export() );
		this._taskManager.remove( 'startTask', this.startTaskHandle )
						 .remove( 'endTask', this.endTaskHandle );

		this.nextState();
	}
}



export default Experiment;