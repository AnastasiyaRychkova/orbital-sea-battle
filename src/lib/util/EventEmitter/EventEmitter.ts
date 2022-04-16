import BrowserEventEmitter from "./BrowserEventEmitter";
import NodeJsEventEmitter from "./NodeJsEventEmitter";

export type { default as IEventEmitter } from "./EventEmitterInterface";


// const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
const isBrowser = () => {
	try {
		return this === window;
	}
	catch (e) {
		return false;
	}
}


const EnvEventEmitter = isBrowser()
			? BrowserEventEmitter
			: NodeJsEventEmitter;

export default EnvEventEmitter;