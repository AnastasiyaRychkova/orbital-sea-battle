import { makeObservable, observable } from "mobx";

import IDiagram from "../../lib/game/Diagram/DiagramInterface";
import periodicTable from "../../lib/game/ChemicalElement/PeriodicTable";
import Diagram from "../../lib/game/Diagram/Diagram";
import IFilter from "../../lib/game/Diagram/Filter/FilterInterface";
import Filter from "../../lib/game/Diagram/Filter/Filter";
import TaskManager from "./TaskManager";



class Controller
{
	filter: IFilter;
	diagram: IDiagram;
	taskManager: TaskManager;


	constructor()
	{
		makeObservable( this, {
			diagram: observable,
			filter: observable,
			taskManager: observable,
		});
		this.diagram = new Diagram( periodicTable );
		this.filter = new Filter( periodicTable.converter );
		this.taskManager = new TaskManager( this.diagram, this.filter );

		this.filter.disabled = false;
	}
}



export default Controller;