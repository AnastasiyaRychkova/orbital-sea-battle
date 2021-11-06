import type { ChemicalElement } from "./ChemicalElement";
import QNConverterInterface from "./QNConverterInterface";

interface PeriodicTableInterface
{
	getByNumber( number: number ): ChemicalElement;
	readonly converter: QNConverterInterface;
}


export default PeriodicTableInterface;