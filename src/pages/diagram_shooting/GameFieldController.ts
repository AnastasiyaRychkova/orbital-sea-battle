import { makeObservable, observable, action } from "mobx";

import { EDiagramCellState as CellState } from "../../lib/game/ChemicalElement/DiagramCell";
import { CellQN } from "../../lib/game/ChemicalElement/QuantumNumbers";
import IDiagram from "../../lib/game/Diagram/DiagramInterface";
import IFilter from "../../lib/game/Diagram/Filter/FilterInterface";
import IGameFieldController from "../../lib/game/Diagram/GameFieldControllerInterface";
import Experiment from "./Experiment";
import IExperimentController from "./ExperimentControllerInterface";
import FormHelper, { FormName } from "./FormHelper";
import IMetrics from "./MetricsInterface";
import ITaskManager from "./TaskManagerInterface";

type InitialData = {
	diagram: IDiagram;
	filter: IFilter;
	experiment: Experiment;
	metrics: IMetrics;
	taskManager: ITaskManager<CellQN>;
}


class GameFieldController implements IGameFieldController, IExperimentController
{
	diagram: IDiagram;
	filter: IFilter;
	experiment: Experiment;
	formHelper: FormHelper;
	

	private _metrics: IMetrics;
	private _taskManager: ITaskManager<CellQN>;

	constructor( initialData: InitialData ) {
		makeObservable( this, {
			diagram: observable,
			filter: observable,
			experiment: observable,

			// cellClickFunction: action.bound,
			sendFunction: action.bound,
		});

		this.diagram = initialData.diagram;
		this.filter = initialData.filter;
		this.experiment = initialData.experiment;
		this._metrics = initialData.metrics;
		this._taskManager = initialData.taskManager;
		this.formHelper = new FormHelper( this.experiment.variant );
	}


	getCellState( quantumNumbers: CellQN ): CellState
	{
		return this.diagram.getCellState( quantumNumbers );
	}

	/* cellClickFunction = ( quantumNumbers: CellQN ): void => {
		this.diagram.toggleCell( quantumNumbers );
	} */
	cellClickFunction = () => {};


	sendFunction = () => {
		if( !this.filter.doesSpecifyCell() )
			return;
		console.log( 'send' );
		const filterState = this.filter.getState() as CellQN
		this.filter.reset();
		this.diagram.aim( filterState );
	}

	isLastShot( quantumNumbers: CellQN ): boolean
	{
		return this.diagram.isLastShot( quantumNumbers );
	}

	getFormURL( formName: FormName ): string
	{
		return this.formHelper.setTestResults( this._taskManager.results )
						. setMetrics( this._metrics.export() )
						.getURL( formName );
	}
}

export default GameFieldController;