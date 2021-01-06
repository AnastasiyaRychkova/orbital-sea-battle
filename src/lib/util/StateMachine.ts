import { StateNode } from "./StateNode";
/* 
import {
	EventName,
	StateName,
	MachineConfig,
} from "./StateMachineTypes";

class StateMachine
{
	#current: StateNode;
	#root: StateNode;

	constructor( config: MachineConfig )
	{
		this.#root = this._createStateMachine( config );
	}

	private _createStateMachine( config: MachineConfig ):
	{

	}

	send( event: EventName ): StateName // TODO: delay
	{
		return this.#current.name; // FIXME: this.current.name;
	}

	get value(): StateName
	{
		return this.#current.name; // FIXME: this.current.name;
	}
	
}

export {
	StateMachine,
} */

export {
	StateNode,
}