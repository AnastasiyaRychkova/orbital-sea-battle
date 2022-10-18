import { IQuantumNumber, QNStrType } from "./types";

export type SpinType = -1 | 1;

/**
 * Спиновое значение. (-1 | 1)
 */
class SpinQN implements IQuantumNumber
{
	protected _number: SpinType;

	static readonly MIN: number = -1;
	static readonly MAX: number = 1;

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
		return newValue >= 0 ? 1 : -1;
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

	assign( value: IQuantumNumber ): SpinQN
	{
		if( value.constructor === this.constructor )
			this._number = ( value as SpinQN )._number;
		return this;
	}

	get type(): QNStrType
	{
		return 's';
	}
}

export default SpinQN;