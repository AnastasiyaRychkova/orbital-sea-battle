import { IntInRange } from '../../../util';
import type { IQuantumNumber, QNStrType } from "./types";

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
		return (this._number > 0 ? '+' : '') + this._number.toString();
	}

	assign( value: IQuantumNumber ): MagneticQN
	{
		if( value.constructor === this.constructor )
			this._number = ( value as MagneticQN )._number;
		return this;
	}

	get type(): QNStrType
	{
		return 'm';
	}
}