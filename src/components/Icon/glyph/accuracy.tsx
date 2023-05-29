import React from 'react';

const accuracy = ( props: React.SVGProps<SVGSVGElement> ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="none"
			viewBox="0 0 100 100"
			{...props}
		>
			<circle
				cx="50"
				cy="50"
				r="36"
				stroke="currentColor"
				strokeWidth="6"
			/>
			<line
				x1="86"
				x2="62"
				y1="50"
				y2="50"
				stroke="currentColor"
				strokeWidth="6"
			/>
			<line
				x1="38"
				x2="14"
				y1="50"
				y2="50"
				stroke="currentColor"
				strokeWidth="6"
			/>
			<line
				x1="50"
				x2="50"
				y1="14"
				y2="38"
				stroke="currentColor"
				strokeWidth="6"
			/>
			<line
				x1="50"
				x2="50"
				y1="62"
				y2="86"
				stroke="currentColor"
				strokeWidth="6"
			/>
		</svg>
	);
};

export default accuracy;
