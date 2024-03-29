import React from 'react';

const cross = ( props: React.SVGProps<SVGSVGElement> ) => {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<line
				x1="8.7"
				y1="8"
				x2="32"
				y2="31.3"
				stroke="currentColor"
				strokeWidth="2.8"
				strokeLinecap="round"
			/>
			<line
				x1="9"
				y1="31.3"
				x2="32.3"
				y2="8"
				stroke="currentColor"
				strokeWidth="2.8"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default cross;
