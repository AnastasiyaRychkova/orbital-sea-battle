import React from 'react';

const shot = ( props: React.SVGProps<SVGSVGElement> ) => {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle
				cx="20"
				cy="20"
				r="12.8"
				stroke="currentColor"
				strokeWidth="2.4"
			/>
			<line
				x1="19.9"
				y1="2.7"
				x2="19.9"
				y2="37.3"
				stroke="currentColor"
				strokeWidth="2.4"
				strokeLinecap="round"
			/>
			<line
				x1="37"
				y1="20.2"
				x2="2.4"
				y2="20.2"
				stroke="currentColor"
				strokeWidth="2.4"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default shot;
