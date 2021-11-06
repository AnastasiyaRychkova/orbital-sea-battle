import IntInRange from '../../util/IntInRange';
import IQuantumNumber from './QuantumNumberInterface';

/**
 * **Магнитное квантовое число (m)**
 * - - - - - - - - - - - - - - -
 * Характеризует положение электронной орбитали в пространстве
 * и принимает целочисленные значения от -I до +I, включая 0.
 */
export default class MagneticQN extends IntInRange implements IQuantumNumber
{
	static readonly MIN: number = -3;
	static readonly MAX: number = 3;

	constructor( value: number|MagneticQN = 0 )
	{
		super( value );
	}

	protected static normalize( number: number ): number
	{
		return super.normalize( number, MagneticQN );
	}

	toString(): string
	{
		return this._number.toString();
	}
}