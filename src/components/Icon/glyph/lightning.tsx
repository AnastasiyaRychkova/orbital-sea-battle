import * as React from 'react';

function lightning( props: React.SVGProps<SVGSVGElement> ) {
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
				d="M27.05 3.141a1.032 1.032 0 01.467 1.196l-3.714 12.07h6.854a1.03 1.03 0 01.75 1.739l-16.5 17.531a1.03 1.03 0 01-1.736-1.01l3.714-12.072h-6.853a1.032 1.032 0 01-.751-1.739l16.5-17.531a1.031 1.031 0 011.268-.186v.002z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default lightning;
