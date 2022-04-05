import IDiagram, {DiagramEventData} from "../../../lib/game/Diagram/DiagramInterface";
import IFilter, {FilterEventData, StoreKey} from "../../../lib/game/Diagram/Filter/FilterInterface";
import qnScheme from "../../../lib/game/ChemicalElement/QNScheme";
import type {TaskConfig} from './types'
import Tasker from "./Tasker";

type ExpectedTaskScheme = ExpectedTaskValues[] | 'generate';
export type ExpectedTaskValues = [string, string, string, string];

export type EventData = FilterEventData|DiagramEventData;

type TaskScheme = {
	target: 'diagram'|'filter',
	event: string,
	expected: ExpectedTaskScheme,
	length?: number,
	infallibility: boolean,
	delay: number,
	cost: number,
	bonusTime?: number,
	bonusCost?: number
}

const taskSchemeKeys: StoreKey[] = ['n', 'l', 'm', 's'];



/**
 * Конструктор объекта задания для инициализации им объекта службы,
 * следящей за выполнением задания
 */
class TaskBuilder
{
	#diagram: IDiagram;
	#filter: IFilter;

	constructor( diagram: IDiagram, filter: IFilter )
	{
		this.#diagram = diagram;
		this.#filter = filter;
	}

	build( scheme: TaskScheme ): Tasker<ExpectedTaskValues, EventData>
	{
		return new Tasker( scheme.target === 'filter'
				? this.buildFilterChangeTask( scheme )
				: this.buildDiagramShotTask( scheme ) );
	}

	buildFilterChangeTask( scheme: TaskScheme ): TaskConfig<ExpectedTaskValues, EventData>
	{
		const taskScheme = scheme.expected instanceof Array
							? scheme.expected
							: this._generateTask( scheme.length );
		return {
			target: this.#filter,
			event: scheme.event,
			tasks: taskScheme,
			infallibility: scheme.infallibility,
			checker: this._filterChangeTaskChecker,
			entry: this._filterTaskEntry,
			exit: this._filterTaskExit,
			delay:scheme.delay,
			cost: scheme.cost,
			bonusCost: scheme.bonusCost,
			bonusTime: scheme.bonusTime,
		}
	}

	private _generateTask( length: number = 1 ): ExpectedTaskValues[]
	{
		const res: ExpectedTaskValues[] = [];
		for (let i = 0; i < length; i++)
			res.push( qnScheme.getRandomCellQN() );

		return res;
	}

	private _filterChangeTaskChecker = ( eventData: EventData, expected: ExpectedTaskValues ) => {
		return (eventData as FilterEventData).state
						.every( (value, index) => value === expected[index] )
	}

	private _filterTaskEntry = ( task: ExpectedTaskValues ) => {
		this.#diagram.reset();
		this.#filter.disabled = false;
		this.#diagram.highlight( task );

		task.forEach(( value, index ) => {
			this.#filter.setDisable( taskSchemeKeys[ index ], value === '' );
		})
	}

	private _filterTaskExit = () => {
		this.#filter.disabled = true;
	}


	buildDiagramShotTask( scheme: TaskScheme ): TaskConfig<ExpectedTaskValues, EventData>
	{
		const taskScheme = scheme.expected instanceof Array
							? scheme.expected
							: this._generateTask( scheme.length );
		return {
			target: this.#diagram,
			event: scheme.event,
			tasks: taskScheme,
			infallibility: scheme.infallibility,
			checker: this._diagramChangeTaskChecker,
			entry: this._diagramTaskEntry,
			exit: this._diagramTaskExit,
			delay:scheme.delay,
			cost: scheme.cost,
			bonusCost: scheme.bonusCost,
			bonusTime: scheme.bonusTime,
		}
	}

	private _diagramChangeTaskChecker = ( eventData: EventData, expected: ExpectedTaskValues ) => {
		return Object.values((eventData as DiagramEventData).qn)
						.every( (value, index) => value.toString() === expected[index] )
	}

	private _diagramTaskEntry = ( task: ExpectedTaskValues ) => {
		this.#diagram.reset();
		this.#diagram.highlight( task );
		this.#filter.disabled = false;
	}

	private _diagramTaskExit = () => {
		this.#filter.disabled = true;
	}
}



export default TaskBuilder;