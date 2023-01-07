import ICoin from "./CoinInterface";

interface IPurse
{
	/** Баланс кошелька */
	balance: number
	
	/**
	 * Положить в кошелек деньги
	 * @param money Coins
	 */
	add( money: ICoin ): IPurse

	/**
	 * Вынуть из кошелька деньги
	 * @param money Coins
	 */
	takeOut( money: number ): ICoin

	/**
	 * Проверить, есть ли в кошельке достаточно средств
	 * @param money Количество денег
	 */
	has( money: number | ICoin ): boolean
}


export default IPurse;