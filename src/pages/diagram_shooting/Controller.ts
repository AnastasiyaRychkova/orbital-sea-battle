import { makeObservable, observable } from "mobx";

import IDiagram from "../../lib/game/Diagram/DiagramInterface";
import periodicTable from "../../lib/game/ChemicalElement/PeriodicTable";
import Diagram from "../../lib/game/Diagram/Diagram";
import IFilter from "../../lib/game/Diagram/Filter/FilterInterface";
import Filter from "../../lib/game/Diagram/Filter/Filter";
import TaskBuilder from "./Tasker/TaskBuilder";
import type { CellQN } from "../../lib/game/ChemicalElement/QuantumNumbers";



class Controller
{
	filter: IFilter;
	diagram: IDiagram;


	constructor()
	{
		makeObservable( this, {
			diagram: observable,
			filter: observable,
		});
		this.diagram = new Diagram( periodicTable );
		this.filter = new Filter( periodicTable.converter );
		this.fire = this.fire.bind( this );

		this.filter.disabled = false;
	}

	makeTaskBuilder(): TaskBuilder
	{
		return new TaskBuilder( this.diagram, this.filter );
	}

	fire(): void
	{
		this.diagram.aim( this.filter.state as CellQN );
	}
}



export default Controller;