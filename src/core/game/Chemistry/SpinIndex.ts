import { IntInRange } from '../../util';
import { CHEMICAL_ELEM_NUM } from './constants';

/**
 * **Индекс электрона (спина)**
 * 
 * Хранит индекс ячейки: [0;117]
 */
class SpinIndex extends IntInRange
{
	static readonly MIN: number = 0;
	static readonly MAX: number = CHEMICAL_ELEM_NUM - 1;

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

export default SpinIndex;