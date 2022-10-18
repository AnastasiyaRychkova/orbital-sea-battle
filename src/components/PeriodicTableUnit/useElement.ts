import { useState } from 'react';

import { periodicTable } from '../../core/game/Services/Chemistry';

const MIN: number = 0;
const MAX: number = periodicTable.MAX_NUMBER;

function normalize( x: number ): number
{
	x = Math.round( x );
	if( x < MIN )
		x = MIN;
	else
		if( x > MAX )
			x = MAX;
	return x;
}

/** Хук для номера выбранного элемента таблицы. 
 *
 * number равен 0 если элемент не выбран
 */
export default function useElement():
[number, (n: number) => void]
{
	const [element, setElement] = useState(0);

	function select( number: number )
	{
		setElement( normalize(number) );
	}

	return [element, select];
}