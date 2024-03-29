import { IntInRange } from '../../../util';
import type { IQuantumNumber, QNStrType } from "./types";

/**
 * **Главное квантовое число (n)**
 * - - - - - - - - - - - - - - -
 * Определяет энергетический уровень электрона,
 * удаленность уровня от ядра, размер электронного облака.
 * Принимает целые значения (n = 1, 2, 3 ... 7)
 * и соответствует номеру периода.
 */
export default class MainQN extends IntInRange implements IQuantumNumber
{
	static readonly MIN: number = 1;
	static readonly MAX: number = 7;

	constructor( value: number|MainQN = MainQN.MIN )
	{
		super( value );
	}

	protected static normalize( number: number ): number
	{
		return super.normalize( number, MainQN );
	}

	toString(): string
	{
		return this._number.toString();
	}

	assign( value: IQuantumNumber ): MainQN
	{
		if( value.constructor === this.constructor )
			this._number = ( value as MainQN )._number;
		return this;
	}

	get type(): QNStrType
	{
		return 'n';
	}
}

