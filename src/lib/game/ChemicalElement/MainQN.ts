import IntInRange from '../../util/IntInRange';
import IQuantumNumber from './QuantumNumberInterface';

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
}

