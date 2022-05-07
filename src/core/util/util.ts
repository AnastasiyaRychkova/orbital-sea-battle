export function randomInRange( from: number, to: number ): number
{
	return (to - from) * Math.random() + from;
}

export function randomBool(): boolean
{
	return Math.random() > 0.5;
}

export function randomIndex( maxIndex: number ): number
{
	return Math.round( Math.random() * maxIndex );
}