import { makeObservable, observable, computed, action } from "mobx"

class Diagram
{
	state = 0;

	constructor()
	{

	}

	@action decrease = () => {
		this.count = this.count - 1
	}

	@action increase = () => {
		this.count = this.count + 1
	}
}

const DiagramStore = new Diagram()
export default DiagramStore