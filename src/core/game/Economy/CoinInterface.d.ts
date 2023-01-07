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


export default ICoin;