import React from 'react';

function CellSymbol() {
	return (
		<symbol id="cell" >
			
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.22649 14L10 4L15.7735 14L11 14L11 28L8.99999 28L9 14L4.22649 14Z" />
			<rect
				fill="green"
				opacity="0"
				width="20"
				height="40"
				stroke="none"
				x="-2"
				y="-8"
			/>
		</symbol>
	);
}

/* 			<rect className="cell-space"
				width="20"
				height="40"
				stroke="none"
			/>
			<line
				x1="11" y1="32"
				x2="11" y2="8"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M4 14L11 7L17.5 14"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
			/> */

export default CellSymbol;