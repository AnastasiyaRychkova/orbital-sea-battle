import { useState } from "react";

import { periodicTable } from "../../core/game/Services/Chemistry";

const MIN: number = 0;
const MAX: number = periodicTable.MAX_ELEM_NUMBER;

function normalize( number: number ): number
{
	number = Math.round( number );
	if( number < MIN )
		number = MIN;
	else
		if( number > MAX )
			number = MAX;
	return number;
}

/** Хук для номера выбранного элемента таблицы. 
 *
 * number равен 0 если элемент не выбран
 */
export default function useElement(): [number, (n: number) => void]
{
	const [element, setElement] = useState(0);

	function select( number: number )
	{
		setElement( normalize(number) );
	}

	return [element, select];
};