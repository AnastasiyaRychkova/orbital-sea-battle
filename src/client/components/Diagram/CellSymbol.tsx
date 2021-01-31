import React from 'react';

function CellSymbol() {
	return (
		<symbol id="cell" >
			<rect className="cell-space"
				width="20"
				height="40"
				stroke="none"
			/>
			<line
				x1="11" y1="32"
				x2="11" y2="8"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path d="M4 14L11 7L17.5 14"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
		/>
		</symbol>
	);
}

export default CellSymbol;