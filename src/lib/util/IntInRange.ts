/**
 * Класс, контролирующий нахождение значения
 * в допустимом диапазоне и в виде целого числа
 */
export default class IntInRange
{
	protected _number: number;

	constructor( number: number )
	{
		this._number = IntInRange.normalize( number, this.constructor as any );
	}

	static readonly MIN: number = 0;
	static readonly MAX: number = 0;

	/**
	 * Привести число в допустимый диапазон.
	 * @param number Преобразуемое значение
	 * @param QNClass Статический класс, который содержит граничные значения. Данный класс должен содержать свойства MIN и MAX
	 */
	protected static range( number: number, QNClass: typeof IntInRange = IntInRange ): number
	{
		if( number < QNClass.MIN )
			number = QNClass.MIN;
		else if( number > QNClass.MAX )
			number = QNClass.MAX;
		
		return number;
	}

	protected static normalize( number: number, QNClass: typeof IntInRange ): number
	{
		return QNClass.range( Math.round( number ), QNClass );
	}

	get value(): number
	{
		return this._number;
	}

	set value( newValue : number )
	{
		this._number = IntInRange.normalize( newValue, this.constructor as any );
	}

	/**
	 * Присваивает значение квантового числа только в том случае,
	 * если они имеют один тип
	 * @param QuantumNumber Квантовое число
	 */
	assign( QuantumNumber: IntInRange ): typeof QuantumNumber
	{
		if( this.constructor === QuantumNumber.constructor )
			this._number = QuantumNumber._number;
		else
			this.value = QuantumNumber.value;
		return this;
	}
}
