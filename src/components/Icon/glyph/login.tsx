import * as React from 'react';

function login( props: React.SVGProps<SVGSVGElement> ) {
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
				d="M34.666 7.037h-22v7.407H9V3.335h29.333v33.333H9V25.556h3.666v7.407h22V7.037z"
				fill="currentColor"
			/>
			<path
				d="M21.969 29.167l-2.592-2.619 4.649-4.696H1.666v-3.704h22.36l-4.65-4.694 2.593-2.62L31.044 20l-9.075 9.167z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default login;
