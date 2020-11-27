import IntInRange from '../../util/IntInRange';

/**
 * **Главное квантовое число (n)**
 * - - - - - - - - - - - - - - -
 * Определяет энергетический уровень электрона,
 * удаленность уровня от ядра, размер электронного облака.
 * Принимает целые значения (n = 1, 2, 3 ... 7)
 * и соответствует номеру периода.
 */
export default class MainQN extends IntInRange
{
	static readonly MIN: number = 1;
	static readonly MAX: number = 7;

	constructor( number: number = MainQN.MIN )
	{
		super( number );
	}

	protected static range( number: number ): number
	{
		return super.range( number, MainQN );
	}
}

