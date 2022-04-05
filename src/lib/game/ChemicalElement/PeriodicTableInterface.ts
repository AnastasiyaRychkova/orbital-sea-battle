import type { ChemicalElement } from "./ChemicalElement";
import QNSchemeInterface from "./QNSchemeInterface";

interface PeriodicTableInterface
{
	getByNumber( number: number ): ChemicalElement;
	readonly converter: QNSchemeInterface;
}


export default PeriodicTableInterface;