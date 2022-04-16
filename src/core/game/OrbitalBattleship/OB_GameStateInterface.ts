import IEventProvider from "../../util/EventEmitter/EventProviderInterface";
import { SState } from "./types";

export type GSEvent = 'change';
export type GSEventData = {
	state: SState[],
}

interface OB_IGameState extends IEventProvider<GSEvent, GSEventData>
{
	
}


export default OB_IGameState;