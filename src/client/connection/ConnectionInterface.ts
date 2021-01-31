import type {
	SelectedChemicalElement,
	FilledChemicalElement,
	PlayerReadiness,
	ShotType,ShotResult,
	OfferResponse,
	ElemCheckResult,
} from "../../lib/game/types";



export default interface ConnectionInterface
{
	connect( callback: () => void ): void;
	checkElementSelection( element: SelectedChemicalElement ): Promise<ElemCheckResult>;
	checkElementFilling( element: FilledChemicalElement ): Promise<ElemCheckResult>;
	reportOnReadinessForTheMatch( playerReadiness: PlayerReadiness ): Promise<PlayerReadiness>;
	fire( shot: ShotType ): Promise<ShotResult>;
	nameElement( element: SelectedChemicalElement ): Promise<boolean>;
	giveIn( playerElement: SelectedChemicalElement ): Promise<SelectedChemicalElement>;
	offerToPlayAgain(): void;
	responseToTheOffer( response: OfferResponse ): void;
}