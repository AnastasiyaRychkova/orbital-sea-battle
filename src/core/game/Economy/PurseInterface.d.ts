import ICoin from "./CoinInterface";

interface IPurse
{
	balance: number
	
	add( coins: ICoin ): IPurse
}


export default IPurse;