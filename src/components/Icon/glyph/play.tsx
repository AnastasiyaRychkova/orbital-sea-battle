import React from 'react';

const play = ( props: React.SVGProps<SVGSVGElement> ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="none"
			viewBox="0 0 100 100"
			{...props}
		>
			<rect
				width="73"
				height="73"
				x="14"
				y="13"
				stroke="currentColor"
				strokeWidth="6"
				rx="2"
			/>
			<path
				fill="currentColor"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="3"
				d="M43 36v28l18-13.89L43 36z"
			/>
		</svg>
	);
};

export default play;
