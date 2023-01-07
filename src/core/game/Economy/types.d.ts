
/**
 * Валюта
 */
interface ICoin
{
	value: number

	/**
	 * Сложение
	 * @param term Слагаемое
	 * @returns Сумма значений в виде нового экземпляра ICoins
	 */
	plus( coins: ICoin | number ): ICoin

	/**
	 * Вычитание
	 * @param deductible Вычитаемое
	 * @returns Разность значений в виде нового экземпляра ICoins
	 */
	minus( deductible: ICoin ): ICoin

	/**
	 * Умножение
	 * @param multiplier Множитель
	 * @returns Валюта умноженная на число в виде нового экземпляра ICoins
	 */
	times( multiplier: number ): ICoin
}

/**
 * Кошелек для хранения денег (валюты)
 */
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
}

/**
 * Оболочка товара абстрактного магазина === ценник
 */
interface ICommodity<ItemType>
{
	/**
	 * Цена товара
	 */
	price: number

	/**
	 * Продаваемый товар
	 */
	readonly item: ItemType
}


export { 
	ICoin,
	IPurse,
	ICommodity,
};