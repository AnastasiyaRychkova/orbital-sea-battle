import { makeObservable, observable } from "mobx";

import IDiagram from "../../core/game/Diagram/DiagramInterface";
import Diagram from "../../core/game/Diagram/Diagram";
import IFilter from "../../core/game/Diagram/Filter/FilterInterface";
import Filter from "../../core/game/Diagram/Filter/Filter";
import TaskBuilder from "./Tasker/TaskBuilder";
import type { CellQN } from "../../core/game/ChemicalElement/QuantumNumbers";



class Controller
{
	filter: IFilter;
	highlight: IFilter;
	diagram: IDiagram;


	constructor()
	{
		makeObservable( this, {
			diagram: observable,
			filter: observable,
			highlight: observable,
		});
		this.filter = new Filter();
		this.highlight = new Filter();
		this.diagram = new Diagram( this.filter, this.highlight );
		this.fire = this.fire.bind( this );

		this.filter.disabled = false;
	}

	makeTaskBuilder(): TaskBuilder
	{
		return new TaskBuilder( this.diagram, this.filter );
	}

	fire(): void
	{
		this.diagram.fire( this.filter.state as CellQN );
	}
}



export default Controller;