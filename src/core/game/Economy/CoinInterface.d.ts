interface ICoin
{
	value: number;

	plus( coins: ICoin | number ): ICoin
}


export default ICoin;