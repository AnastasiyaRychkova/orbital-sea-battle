import React from 'react';
import CellSymbol from './CellSymbol';
import DiagramField from './DiagramField';
import DiagramStateType from '../../lib/game/Diagram/DiagramInterface';

type IProps = {
	diagram: DiagramStateType,
	className: string,
}

function Diagram( props: IProps )
{
	return(
		<svg className={props.className} viewBox="-30 -2 1520 602" fill="none" preserveAspectRatio="xMidYMid meet">
			<defs>
				<CellSymbol />
			</defs>
			<DiagramField diagram={props.diagram} />
		</svg>
	)
}

export default Diagram;