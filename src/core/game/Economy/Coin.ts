import ICoin from "./CoinInterface";

/**
 * Валюта
 */
class Coin implements ICoin
{
	readonly value: number;

	constructor( value = 0 )
	{
		this.value = this._normalize( value );
	}

	private _normalize( value: number ): number
	{
		return value > 0 ? Math.floor( value ) : 0
	} 


	/**
	 * Сложение
	 * @param term Слагаемое
	 * @returns Сумма значений в виде нового экземпляра ICoins
	 */
	plus( term: ICoin ): ICoin
	{
		return new Coin( this.value + term.value );
	}

	/**
	 * Вычитание
	 * @param deductible Вычитаемое
	 * @returns Разность значений в виде нового экземпляра ICoins
	 */
	minus( deductible: ICoin ): ICoin
	{
		return new Coin( this.value - deductible.value );
	}

	/**
	 * Умножение
	 * @param multiplier Множитель
	 * @returns Валюта умноженная на число в виде нового экземпляра ICoins
	 */
	times( multiplier: number ): ICoin
	{
		return new Coin( this.value * multiplier );
	}
}


const coins = ( value?: number ) => new Coin( value );

export default coins;