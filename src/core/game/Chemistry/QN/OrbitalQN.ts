import { IntInRange } from '../../../util';
import type { IQuantumNumber, QNStrType, OrbitalStr } from "./types";

/**
 * **Орбитальное квантовое число (l)**
 * - - - - - - - - - - - - - - - - - - -
 * Характеризует геометрическую форму орбитали.
 * Принимает значение целых чисел от 0 до (n - 1).
 * l=0 s- подуровень, s- орбиталь - орбиталь сфера
 * 
 * Value | Symbol
 * ----- | ------
 * 0 | s
 * 1 | p
 * 2 | d
 * 3 | f
 */
export default class OrbitalQN extends IntInRange implements IQuantumNumber
{
	static readonly LETTERS: OrbitalStr[] = [ 's', 'p', 'd', 'f' ];

	static readonly MIN: number = 0;
	static readonly MAX: number = 3;

	constructor( symbol: string|number|OrbitalQN = 's' )
	{
		super( typeof symbol === "string"
				? OrbitalQN.LETTERS.indexOf( symbol as OrbitalStr )
				: symbol
		);
	}

	/** Перевести число в строку */
	static numToStr( number: number ): OrbitalStr
	{
		return OrbitalQN.LETTERS[ OrbitalQN.normalize( number, OrbitalQN ) ];
	}

	/** Перевести строку в число */
	static strToNum( symbol: OrbitalStr ): number
	{
		return OrbitalQN.LETTERS.indexOf( symbol );
	}

	toString(): string
	{
		return OrbitalQN.LETTERS[ this._number ];
	}

	assign( value: IQuantumNumber ): OrbitalQN
	{
		if( value.constructor === this.constructor )
			this._number = ( value as OrbitalQN )._number;
		return this;
	}

	get type(): QNStrType
	{
		return 'l';
	}
}