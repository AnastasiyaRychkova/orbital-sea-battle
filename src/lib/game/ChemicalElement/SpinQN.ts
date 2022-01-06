import IQuantumNumber from "./QuantumNumberInterface";

export type SpinType = -1 | 1;

/**
 * Спиновое значение. (-1 | 1)
 */
class SpinQN implements IQuantumNumber
{
	protected _number: SpinType;

	/**
	 * 
	 * @param value Number( 1 | -1) || String( '+1/2' | )
	 */
	constructor( value: number|string = 1 )
	{
		this._number = ( typeof value === 'string' )
						? (value === '+1/2' ? 1 : -1)
						: SpinQN.normalize( value );
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
		return this._number > 0 ? '+1/2' : '−1/2';
	}
}

export default SpinQN;