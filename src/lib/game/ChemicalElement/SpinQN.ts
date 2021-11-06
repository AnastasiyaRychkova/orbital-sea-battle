import IQuantumNumber from "./QuantumNumberInterface";

export type SpinType = -1 | 1;

/**
 * Спиновое значение. (-1 | 1)
 */
class SpinQN implements IQuantumNumber
{
	protected _number: SpinType;

	constructor( value: number = 1 )
	{
		this._number = SpinQN.normalize( value );
	}

	protected static normalize( newValue: number )
	{
		return newValue > 0 ? 1 : -1;
	}

	get value(): number
	{
		return this._number;
	}

	set value( newValue: number )
	{
		this._number = SpinQN.normalize( newValue );
	}

	toString(): string
	{
		return this._number > 0 ? '1' : '-1';
	}
}

export default SpinQN;