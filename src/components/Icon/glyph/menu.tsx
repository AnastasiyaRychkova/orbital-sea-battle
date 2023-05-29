import * as React from 'react';

function menu( props: React.SVGProps<SVGSVGElement> ) {
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
				stroke="currentColor"
				strokeWidth={3}
				d="M4 9.5h32M4 20.5h32M4 31.5h32"
			/>
		</svg>
	);
}

export default menu;
