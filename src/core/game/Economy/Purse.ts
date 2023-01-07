import coins from "./Coin";
import ICoin from "./CoinInterface";
import IPurse from "./PurseInterface";

class Purse implements IPurse
{
	#balance: ICoin;

	constructor( initialBalance: number = 0 )
	{
		this.#balance = coins( initialBalance );
	}

	get balance(): number
	{
		return this.#balance.value;
	}

	add( money: ICoin ): IPurse
	{
		this.#balance = this.#balance.plus( money );
		return this;
	}

	takeOut( money: number ): ICoin
	{
		const withdrawnCoins = coins( money );
		this.#balance = this.#balance.minus( withdrawnCoins );
		return withdrawnCoins;
	}

	has( money: number | ICoin ): boolean {
		return typeof money === 'number'
			? money <= this.#balance.value
			: money.value <= this.#balance.value;
	}
}



export default Purse;