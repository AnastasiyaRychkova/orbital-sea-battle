type Segment = {
	MIN: number,
	MAX: number,
}

/**
 * Класс, контролирующий нахождение значения
 * в допустимом диапазоне и в виде целого числа
 */
export default class IntInRange
{
	protected _number: number;

	constructor( value: number|IntInRange )
	{
		this._number = typeof value === 'number'
			? IntInRange.normalize( value, this.constructor as any )
			: value._number;
	}

	static readonly MIN: number = 0;
	static readonly MAX: number = 0;

	/**
	 * Привести число в допустимый диапазон.
	 * @param number Преобразуемое значение
	 * @param QNClass Статический класс, который содержит граничные значения. Данный класс должен содержать свойства MIN и MAX
	 */
	protected static normalize( number: number, QNClass: Segment ): number
	{
		if( number < QNClass.MIN )
			number = QNClass.MIN;
		else if( number > QNClass.MAX )
			number = QNClass.MAX;
		
		return Math.round( number );
	}

	get value(): number
	{
		return this._number;
	}

	set value( newValue : number )
	{
		this._number = IntInRange.normalize( newValue, this.constructor as any );
	}
}
