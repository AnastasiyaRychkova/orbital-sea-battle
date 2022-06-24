import { IntInRange } from '../../util';
import periodicTable from './PeriodicTable';

/**
 * **Индекс электрона (спина)**
 * 
 * Хранит индекс ячейки: [0;117]
 */
export default class SpinIndex extends IntInRange
{
	static readonly MIN: number = 0;
	static readonly MAX: number = periodicTable.MAX_NUMBER;

	constructor( number: number = SpinIndex.MIN )
	{
		super( number );
	}

	protected static range( number: number = 0 ): number
	{
		return super.normalize( number, SpinIndex );
	}

	static *iterator()
	{
		const cell = new SpinIndex( SpinIndex.MIN );

		for( ; cell._number <= SpinIndex.MAX; cell._number++ )
			yield cell;
	}
}