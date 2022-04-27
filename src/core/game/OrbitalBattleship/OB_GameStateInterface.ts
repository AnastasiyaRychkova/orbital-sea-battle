import IEventProvider from "../../util/EventEmitter/EventProviderInterface";
import { SState } from "./types";

export type GSResults = {
	isLocalPlayerWinner: boolean,
	enemy: {
		elemNumber: number,
		steps: number,
		certainty: number,
	},
	player: {
		elemNumber: number,
		steps: number,
		certainty: number,
	},
	duration: number,
};

export type GSStateChanging = {
	state: SState[],
};

export type GSEvent = 'change' | 'new';
export type GSEventData = GSStateChanging | GSResults;

interface OB_IGameState extends IEventProvider<GSEvent, GSEventData>
{
	send( event: string, context?: object ): void;

	isOver: boolean;
}


export default OB_IGameState;