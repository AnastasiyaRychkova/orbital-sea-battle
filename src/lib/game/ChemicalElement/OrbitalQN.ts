import type { OrbitalStr } from "./QuantumNumbers";
import IntInRange from '../../util/IntInRange';

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
export default class OrbitalQN extends IntInRange
{
	static readonly LETTERS: OrbitalStr[] = [ 's', 'p', 'd', 'f' ];

	static readonly MIN: number = 0;
	static readonly MAX: number = 3;

	constructor( symbol: OrbitalStr | number = 's' )
	{
		super( typeof symbol === "number"
				? symbol
				: OrbitalQN.LETTERS.indexOf( symbol )
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

	get string(): OrbitalStr
	{
		return OrbitalQN.LETTERS[ this._number ];
	}

	set string( newValue: OrbitalStr )
	{
		this._number = OrbitalQN.strToNum( newValue );
	}
}