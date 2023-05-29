import * as React from 'react';

function info( props: React.SVGProps<SVGSVGElement> ) {
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
				d="M20 17.167a1.416 1.416 0 011.417 1.416v8.5a1.416 1.416 0 01-2.834 0v-8.5A1.416 1.416 0 0120 17.167zM20 15.042a2.125 2.125 0 10-1.501-3.629 2.122 2.122 0 001.5 3.623v.006z"
				fill="currentColor"
			/>
			<path
				d="M3 20a17 17 0 1134 0 17 17 0 01-34 0zM20 5.833a14.167 14.167 0 100 28.334 14.167 14.167 0 000-28.334z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default info;
