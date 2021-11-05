import BrowserEventEmitter from "./BrowserEventEmitter";

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

const EnvEventEmitter = isBrowser()
			? BrowserEventEmitter
			: BrowserEventEmitter;
// TODO: Написать реализацию Emitter для Node.js

export default EnvEventEmitter;