import * as React from 'react';

function scroll( props: React.SVGProps<SVGSVGElement> ) {
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
				d="M27.174 12.987L20 5.702 12.813 13 11 11.156 20 2l9 9.156-1.826 1.83z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 20a4.999 4.999 0 109.998 0A4.999 4.999 0 0015 20zm7.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
				fill="currentColor"
			/>
			<path
				d="M20 34.303L12.8 27 11 28.855 20 38l9-9.145-1.813-1.842L20 34.303z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default scroll;
