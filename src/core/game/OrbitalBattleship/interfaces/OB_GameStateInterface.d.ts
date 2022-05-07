import type { IEventProvider } from '../../../util/EventEmitter/types';
import type { OB_ILocalPlayer, OB_IEnemy } from '../OB_Entities';
import type { SState, PlayerResults, GameScore } from "../types";

export type GSResults = {
	isLocalPlayerWinner: boolean,
	enemy: PlayerResults,
	player: PlayerResults,
	duration: number,
};

export type GSStateChanging = {
	state: SState[],
};

export type GSEvent = 'change' | 'finish' | 'new' | 'end';
export type GSEventData = GSStateChanging | GSResults;




interface OB_IGameState extends IEventProvider<GSEvent, GSEventData>
{
	send( event: string, context?: object ): void;

	player: OB_ILocalPlayer,
	enemy: OB_IEnemy,
	winner?: OB_IPlayer,

	result: GSResults | undefined;

	score: GameScore;

	isOver: boolean;

	state: SState;

	statesChain: SState[];
}


export default OB_IGameState;