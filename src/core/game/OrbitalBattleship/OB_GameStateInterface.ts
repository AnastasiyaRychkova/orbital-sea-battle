import IEventProvider from "../../util/EventEmitter/EventProviderInterface";
import { SState } from "./types";

export type GSEvent = 'change';
export type GSEventData = {
	state: SState[],
}

interface OB_IGameState extends IEventProvider<GSEvent, GSEventData>
{
	send( event: string, context?: object ): void;
}


export default OB_IGameState;