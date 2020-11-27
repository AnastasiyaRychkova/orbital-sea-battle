import IntInRange from '../../util/IntInRange';

/**
 * **Магнитное квантовое число (m)**
 * - - - - - - - - - - - - - - -
 * Характеризует положение электронной орбитали в пространстве
 * и принимает целочисленные значения от -I до +I, включая 0.
 */
export default class MagneticQN extends IntInRange
{
	static readonly MIN: number = -3;
	static readonly MAX: number = 3;

	constructor( number: number = 0 )
	{
		super( number );
	}

	protected static range( number: number ): number
	{
		return super.range( number, MagneticQN );
	}
}