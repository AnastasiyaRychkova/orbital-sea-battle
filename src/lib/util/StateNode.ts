import type {
	EventName,
	StateName,
	StateNodeConfig,
	Transition,
} from './StateMachineTypes'

class StateNode
{
	name: StateName;
	#parent?: StateNode;
	// events: Map<EventName, Transition>;

	constructor( name: string, config: StateNodeConfig )
	{
		this.name = name;
	}

}

export { StateNode };