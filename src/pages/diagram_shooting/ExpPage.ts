import { action, makeObservable, observable } from 'mobx';
import scheme from './scheme.json';
import type {MWindow, TaskScheme, TaskType, URL, WindowScheme, } from './ExpPage.d';




class ExpPage
{
	window: MWindow | null;
	task: TaskType | null;
	results: Object | null;
	#location: string;

	constructor()
	{
		makeObservable(this, {
			window: observable,
			task: observable,

			apply: action,
		})
		this.#location = '';
		this.window = null;
		this.task = null;
		this.results = null;
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
		else
			this._applyWindow( destination as WindowScheme );

		this.#location = location;
	}

	_applyTask( destination: TaskScheme ): void
	{
		const task = {
			message: destination.message,
			comment: destination.comment,
		}

		//FIXME: Complete
	}

	_applyWindow( destination: WindowScheme ): void
	{
		this.window = {
			header: destination.header,
			subheader: destination.subheader,
			content: destination.content,
			align: destination.style === 'instruction' ? 'left' : 'center',
			actions: destination.actions,
		};
	}
}


const page = new ExpPage();

export default page;