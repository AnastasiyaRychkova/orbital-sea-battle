import React from 'react';
import CellSymbol from './CellSymbol';
import DiagramField from './DiagramField';
import './diagram.css';

function Diagram( props: any )
{
	return(
		<svg id="diagram" viewBox="-2 -2 1520 602" fill="none" preserveAspectRatio="xMidYMid meet">
			<defs>
				<CellSymbol />
			</defs>
			<DiagramField diagram={props.diagram} />
		</svg>
	)
}

export default Diagram;