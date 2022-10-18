import coins from "./Coin";
import ICoin from "./CoinInterface";
import IPurse from "./PurseInterface";

class Purse implements IPurse
{
	#balance: ICoin;

	constructor()
	{
		this.#balance = coins( 0 );
	}

	get balance(): number
	{
		return this.#balance.value;
	}

	add( coins: ICoin ): IPurse
	{
		
		return this;
	}
}



export default Purse;