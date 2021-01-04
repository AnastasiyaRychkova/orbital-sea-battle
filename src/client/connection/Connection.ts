import { connect as connectSocket, send, addConnectionListener } from "./SocketConnection";
import type {
	SelectedChemicalElement,
	FilledChemicalElement,
	PlayerReadiness,
	ShotType,
	ShotResult,
	OfferResponse,
	ElemCheckResult,
} from "./types";
import ConnectionInterface from "./ConnectionInterface";
import { ReadinessCode } from "../../lib/game/Readiness";

class ConnectionImplementation implements ConnectionInterface
{
	
	connect( callback: () => void ): void
	{
		connectSocket( callback );
		/*TODO: Bind events
		...
		*/
	}


	checkElementSelection( element: SelectedChemicalElement ): Promise<ElemCheckResult>
	{
		return new Promise( ( resolve ) => { // TODO: Проверить: что будет, если сервер не ответит
			send(
				'CheckSelection',
				element,
				( result: ElemCheckResult ) => {
					resolve( result );
				},
			);
		} );
	}


	checkElementFilling( element: FilledChemicalElement ): Promise<ElemCheckResult>
	{
		return new Promise( ( resolve ) => {
			send(
				'CheckConfig',
				element,
				( result: ElemCheckResult ) => {
					resolve( result );
				}
			)
		} );
	}


	reportOnReadinessForTheMatch( playerReadiness: PlayerReadiness ): Promise<PlayerReadiness>
	{
		return new Promise( ( resolve ) => {
			send(
				'Ready',
				playerReadiness,
				( oppReadiness: PlayerReadiness ) => {
					resolve( oppReadiness );
				}
			);
		} );
	}


	fire( shot: ShotType ): Promise<ShotResult>
	{
		return new Promise( ( resolve ) => {
			send(
				'Fire',
				shot,
				( shotResult: ShotResult ) => {
					resolve( shotResult );
				}
			)
		} );
	}


	nameElement( element: SelectedChemicalElement ): Promise<ElemCheckResult>
	{
		return new Promise( ( resolve ) => {
			send(
				'NameElement',
				element,
				( namingResult: ElemCheckResult ) => {
					resolve( namingResult );
				}
			)
		} );
	}


	giveIn( playerElement: SelectedChemicalElement ): Promise<SelectedChemicalElement>
	{
		return new Promise( ( resolve ) => {
			send(
				'GiveIn',
				playerElement,
				( oppElement: SelectedChemicalElement ) => {
					resolve( oppElement );
				}
			)
		} );
	}


	offerToPlayAgain(): void
	{
		send(
			'OfferNewGame',
		);
	}

	responseToTheOffer( response: OfferResponse ): void
	{
		send(
			'OfferResponse',
			response,
		)
	}

}


export default ConnectionImplementation;
