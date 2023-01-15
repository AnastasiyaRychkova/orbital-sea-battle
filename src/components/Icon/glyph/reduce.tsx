import * as React from 'react';

function reduce( props: React.SVGProps<SVGSVGElement> ) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M5 34.917l8.333-8.25M34.917 5l-8.25 8.25M32.7 14.3h-7.5V6.8M6.8 25.6h7.5v7.5"
				stroke="currentColor"
				strokeWidth={3.6}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default reduce;
