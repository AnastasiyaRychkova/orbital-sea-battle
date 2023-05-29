import * as React from 'react';

function chevron( props: React.SVGProps<SVGSVGElement> ) {
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
				d="M12 36l16-16L12 4"
				stroke="currentColor"
				strokeWidth={3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default chevron;
