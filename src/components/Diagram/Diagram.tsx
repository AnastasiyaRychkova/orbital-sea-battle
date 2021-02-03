import React from 'react';
import CellSymbol from './CellSymbol';
import DiagramField from './DiagramField';
import './diagram.css';
import DiagramStateType from '../../lib/game/Diagram/DiagramInterface';

type DiagramProps = {
	diagram: DiagramStateType,
	className: string,
}

function Diagram( props: DiagramProps )
{
	return(
		<svg className={props.className} viewBox="-2 -2 1520 602" fill="none" preserveAspectRatio="xMidYMid meet">
			<defs>
				<CellSymbol />
			</defs>
			<DiagramField diagram={props.diagram} />
		</svg>
	)
}

export default Diagram;