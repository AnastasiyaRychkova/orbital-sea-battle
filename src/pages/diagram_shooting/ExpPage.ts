import { action, computed, makeObservable, observable } from 'mobx';

import scheme from './scheme.json';
import progress from './ExpProcess';
import TaskBuilder, {ExpectedTaskValues as TaskValues, EventData} from './Tasker/TaskBuilder';
import Tasker from './Tasker/Tasker';
import type {TaskScheme, TaskType, URL, WindowScheme, } from './ExpPage.d';
import type { TaskerEventData, TaskerEventObject } from './Tasker/types';
import type { MWScheme, TaskResults } from "../../components/ModalWindow/types";



class ExpPage
{
	window: MWScheme | null = null;
	task: TaskType | null = null;
	results: TaskResults | null = null;

	#location: string = '';
	#taskBuilder: TaskBuilder | null = null;
	_tasker: Tasker<TaskValues, EventData> | null = null;


	constructor()
	{
		makeObservable(this, {
			window: observable,
			task: observable,
			_tasker: observable,

			currentTaskCompleted: computed,
			apply: action,
		});
		this._completeTaskHandler = this._completeTaskHandler.bind( this );
	}

	setTaskBuilder( taskBuilder: TaskBuilder ): void
	{
		this.#taskBuilder = taskBuilder;
	}

	apply( location: URL ): void
	{
		if( this.#location === location )
			return;

		const destination = scheme[ location ];
		if( !destination ) {
			console.error( 'Page', 'Location was not found', location );
			return;
		}

		if( destination.type === 'task' )
			this._applyTask( destination as TaskScheme );
		else {
			this._applyWindow( destination as WindowScheme );
			setTimeout(
				progress.toURL,
				0,
				location,
				( destination as WindowScheme ).actions[0].to
			);
		}

		this.#location = location;
	}

	_applyTask( destination: TaskScheme ): void
	{
		if( !this.#taskBuilder )
			return;

		this._tasker = this.#taskBuilder.build( {
			...destination,
			delay: 800,
		} );
		this._tasker.once(
			'complete',
			this._completeTaskHandler,
		);
		this.task = {
			message: destination.message,
			comment: destination.comment,
			process: this._tasker.digest,
			resultsLocation: destination.next,
		}
		this.window = null;
	}

	private _completeTaskHandler( event: TaskerEventObject ):void
	{
		const results = event.detail;
		this.results = this._makeResultsObject( results );
		//FIXME: Complete
	}

	private _makeResultsObject( results: TaskerEventData ): TaskResults
	{
		const duration = new Date( results.duration );
		const res: TaskResults = [{
			name: 'попаданий',
			value: `${results.right}/${results.total}`,
			icon: 'hit'
		}];
		progress.variant && res.push({
			name: 'точность',
			value: Math.round(results.right / results.total * 100) + '%',
			icon: 'accuracy'
		});
		res.push({
			name: 'время',
			value: duration.getMinutes() +':'+ duration.getSeconds(),
			icon: 'clock'
		});

		return res;
	}

	get currentTaskCompleted(): boolean
	{
		return this._tasker != null && this._tasker.digest.done;
	}

	_applyWindow( destination: WindowScheme ): void
	{
		this.window = {
			header: destination.header,
			subheader: destination.subheader,
			content: destination.content,
			style: destination.style,
			actions: destination.actions,
		};
		this._tasker = null;
		this.task = null;
	}
}


const page = new ExpPage();

export default page;