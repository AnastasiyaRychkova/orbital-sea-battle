import ICoin from "./CoinInterface";

/**
 * Валюта
 */
class Coin implements ICoin
{
	#value: number;

	constructor( value = 0 )
	{
		this.#value = this._normalize( value );
	}

	private _normalize( value: number ): number
	{
		return value > 0 ? Math.floor( value ) : 0
	} 

	get value(): number
	{
		return this.#value;
	}

	/**
	 * 
	 * @param term Слагаемое. Может быть отрицательным числом.
	 * @returns Сумма значений в виде нового экземпляра ICoins
	 */
	plus( term: ICoin | number ): ICoin
	{
		return new Coin( this.#value + ( typeof term === 'number'
										? term
										: term.value ) );
	}


}


const coins = ( value?: number ) => new Coin( value );

export default coins;